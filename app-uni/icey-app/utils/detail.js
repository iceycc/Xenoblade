export const details = {
    "err_no": 0,
    "err_msg": "success",
    "data": {
        "article_id": "6961323610631831560",
        "article_info": {
            "article_id": "6961323610631831560",
            "user_id": "4459274891961112",
            "category_id": "6809637769959178254",
            "tag_ids": [
                6809640408797167623
            ],
            "visible_level": 0,
            "link_url": "",
            "cover_image": "",
            "is_gfw": 0,
            "title": "从源码角度来研究PostgreSQL是如何管理使用文件描述符",
            "brief_content": "1.前言 在详谈PostgreSQL是如何评估进程可打开最大文件数量数量 一文中，通过结合内核的方式，详细分析了PostgreSQL对于进程能够同时打开最大文件数量的逻辑判断处理过程，从而使进程不会因",
            "is_english": 0,
            "is_original": 1,
            "user_index": 5.9139374137187,
            "original_type": 0,
            "original_author": "",
            "content": "",
            "ctime": "1620809489",
            "mtime": "1620958587",
            "rtime": "1620958587",
            "draft_id": "6961323403173167111",
            "view_count": 420,
            "collect_count": 2,
            "digg_count": 4,
            "comment_count": 0,
            "hot_index": 24,
            "is_hot": 0,
            "rank_index": 6.90292699,
            "status": 2,
            "verify_status": 1,
            "audit_status": 2,
            "mark_content": "1.前言\n====\n\n在[详谈PostgreSQL是如何评估进程可打开最大文件数量数量](http://mp.weixin.qq.com/s?__biz=MzkyNDE2NDU3Ng==&mid=2247484879&idx=1&sn=0689068dc7a603fe0825f83f891deabe&chksm=c1db4d40f6acc45646bada941e1450e22725770d0a55b40da027c242b46f72eb1f48ba0f295d&scene=21#wechat_redirect) 一文中，通过结合内核的方式，详细分析了PostgreSQL对于进程能够同时打开最大文件数量的逻辑判断处理过程，从而使进程不会因为在此基础上，此处将继续通过研究读源码，结合编译运行postmaster的方式来分析PostgreSQL数据库是如何去管理并使用文件格式（File Descriptor）句柄。 [](http://mp.weixin.qq.com/s?__biz=MzkyNDE2NDU3Ng==&mid=2247484879&idx=1&sn=0689068dc7a603fe0825f83f891deabe&chksm=c1db4d40f6acc45646bada941e1450e22725770d0a55b40da027c242b46f72eb1f48ba0f295d&scene=21#wechat_redirect) [](http://mp.weixin.qq.com/s?__biz=MzkyNDE2NDU3Ng==&mid=2247484879&idx=1&sn=0689068dc7a603fe0825f83f891deabe&chksm=c1db4d40f6acc45646bada941e1450e22725770d0a55b40da027c242b46f72eb1f48ba0f295d&scene=21#wechat_redirect) \n\n2.从VFD说起\n========\n\n出于各种原因，PostgreSQL服务器会打开许多​​文件副本。包括基表，临时文件（例如排序和哈希散列spool文件等）以及对libpq C常规库（如system（3））的随机调用。一个进程可以拥有的打开文件的数量很容易超过系统限制（在许多现代操作系统上，这个值大约1024，但在其他操作系统上可能会导致）。\n\n为了统一管理，使用文件句柄，于是乎PostgreSQL引入了VFD机制，所谓的VFD即指虚拟文件重定向（虚拟文件描述符（VFD））。 （内核）分配的文件尺寸。当进程需要打开文件时候，VFD总是能够返回一个有效且可用的文件位置。细节，以及相应的逻辑判断处理。\n\n本质上，PostgreSQL所能使用的文件数量仍然是操作系统规定的，仅不过因为VFD内部特殊实现机制，给进程一种表象，即文件少量是无穷尽的。进程在操作系列文件（UNIX，一切皆文件，因此这里包括文件包括目录等）时，不是直接通过调用系统函数（例如打开，读取，写入，查找，同步等）去处理，甚至通过VFD。VFD内部会进行系列的逻辑判断处理，并最终最终一个一个待处理文件的对应内核中的文件句柄fd。不过反馈给进程的fd不是内核分配的那个真实fd，而是一个虚拟的，即经过VFD内部一层映射后的虚拟文件句柄VFD。实际上，该VFD是VFD缓存池VfdCache中的真实文件句柄FD所对应的VFD索引，即数组下标。\n\n从Linux内核架构图来看，VFD位于应用层的系统调用（即open，read等）函数上方。如下图示所示：  \n\n![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e820d77656d42c5944b5d75280a0070~tplv-k3u1fbpfcp-zoom-1.image)\n\n  \n其顺序是：PostgreSQL过程直接调用VFD，VFD内部封装了系统函数。当进程要获取文件相关数据信息时直接调用VFD的系列封装函数即可。\n\n2.1 VFD数据结构\n-----------\n\nPostgreSQL是通过声明一个名为Vfd的结构体数据类型来实现VFD的LRU（Last Recently Used，最近最少使用）缓存池管理的。因此，在进入LRU池管理之前，让我们先对Vfd的结构类型声明有个熟悉的概念。\n\n对于PostgreSQL中的进程，每当打开一个文件时候，均会返回一个Vfd结构体变量。对于Vfd的类型声明，位于src/backend/storage/file/fd.c文件中，其格式如下所示：\n\n  \n\n```\ntypedef struct vfd\n{\n  int        fd;          /* current FD, or VFD_CLOSED if none */\n  unsigned short   fdstate;      /* bitflags for VFD's state */\n  ResourceOwner   resowner;      /* owner, for automatic cleanup */\n  File      nextFree;      /* link to next free VFD, if in freelist */\n  File      lruMoreRecently;  /* doubly linked recency-of-use list */\n  File      lruLessRecently;\n  off_t      fileSize;      /* current size of file (0 if not temporary) */\n  char         *fileName;      /* name of file, or NULL for unused VFD */\n  /* NB: fileName is malloc'd, and must be free'd when closing the VFD */\n  int        fileFlags;      /* open(2) flags for (re)opening the file */\n  mode_t      fileMode;      /* mode to pass to open(2) */\n} Vfd;\n```\n\n在PostgreSQL 13.2版本中，该结构体数据类型中共有10个数据成员。下面分别对各成员所充当的功能进行描述，这将有助于接下来的对LRU池逻辑的理解。\n\n*    fd\n    \n\nfd是当前VFD所对应的内核分配的真实文件描述符fd。如果VFD没有打开文件（即没有文件描述符），则其初始值是VFD\\_CLOSED，即-1。其宏名声明如下：\n\n```\n#define VFD_CLOSED (-1)\n```\n\n*   fdstate\n    \n\n记录该VFD的状态标记位。在13.2版本中，该状态标记位共有以下三种，分别是：FD\\_DELETE\\_AT\\_CLOSE、FD\\_CLOSE\\_AT\\_EOXACT 以及\n\nFD\\_TEMP\\_FILE\\_LIMIT。\n\n其声明如下：\n\n```\n#define FD_DELETE_AT_CLOSE  (1 << 0)  /* T = delete when closed */\n#define FD_CLOSE_AT_EOXACT  (1 << 1)  /* T = close at eoXact */\n#define FD_TEMP_FILE_LIMIT  (1 << 2)  /* T = respect temp_file_limit */\n```\n\n这里之所以强调PostgreSQL版本，是因为不同版本间该成员的标记位值差异比较大。比如在V9.6.7中，该标记位的值声明如下：\n\n```\n/* these are the assigned bits in fdstate below: */\n#define FD_TEMPORARY    (1 << 0)  /* T = delete when closed */\n#define FD_XACT_TEMPORARY  (1 << 1)  /* T = delete at eoXact */\n```\n\n不但宏名改变，其值也有所差异：\n\n*   FD\\_DELETE\\_AT\\_CLOSE\n    \n\n 若fdstate第1位置1，则表示文件关闭时应该删除掉。\n\n*   FD\\_TEMP\\_FILE\\_LIMIT\n    \n\n若fdstate第2位置1，则遵守临时文件限制。\n\n*   FD\\_CLOSE\\_AT\\_EOXACT\n    \n\n若fdstate第3位置1，则在eoXact关闭。\n\n*   resowner\n    \n\n记录资源所有者，用于自动清理。该成员所属的结构体类型如下：\n\n```\ntypedef struct ResourceOwnerData\n{\n  ResourceOwner parent;    /* NULL if no parent (toplevel owner) */\n  ResourceOwner firstchild;  /* head of linked list of children */\n  ResourceOwner nextchild;  /* next child of same parent */\n  const char *name;      /* name (just for debugging) */\n\n  /* We have built-in support for remembering: */\n  ResourceArray bufferarr;  /* owned buffers */\n  ResourceArray catrefarr;  /* catcache references */\n  ResourceArray catlistrefarr;  /* catcache-list pins */\n  ResourceArray relrefarr;  /* relcache references */\n  ResourceArray planrefarr;  /* plancache references */\n  ResourceArray tupdescarr;  /* tupdesc references */\n  ResourceArray snapshotarr;  /* snapshot references */\n  ResourceArray filearr;    /* open temporary files */\n  ResourceArray dsmarr;    /* dynamic shmem segments */\n  ResourceArray jitarr;    /* JIT contexts */\n\n  /* We can remember up to MAX_RESOWNER_LOCKS references to local locks. */\n  int      nlocks;      /* number of owned locks */\n  LOCALLOCK  *locks[MAX_RESOWNER_LOCKS];  /* list of owned locks */\n}      ResourceOwnerData;\n\n```\n\n该结构体内部成员列表中分别记录了快照、动态shmem段、所分配的缓存资源等等。对于Vfd中的resowner成员，后面将专门出一章节来讲解。\n\n  \n\n*   nextFree\n    \n\n指向下一个空闲的VFD。其中nextFree成员的数据类型是FILE。注意，Vfd中的FILE并不是C库中的文件流FILE数据类型。在Vfd中，其FILE类型是int整型的别名，它表示该VFD位于VfdCache数组中的下标。如下所示：\n\n```\ntypedef int File;\n```\n\n而对于C库中的FILE类型，其结构体类型声明如下（该结构类型声明来自glibc V2.31）。\n\n```\ntypedef struct _IO_FILE FILE;\n\nstruct _IO_FILE\n{\n  int _flags;    /* High-order word is _IO_MAGIC; rest is flags. */\n\n  /* The following pointers correspond to the C++ streambuf protocol. */\n  char *_IO_read_ptr;  /* Current read pointer */\n  char *_IO_read_end;  /* End of get area. */\n  char *_IO_read_base;  /* Start of putback+get area. */\n  char *_IO_write_base;  /* Start of put area. */\n  char *_IO_write_ptr;  /* Current put pointer. */\n  char *_IO_write_end;  /* End of put area. */\n  char *_IO_buf_base;  /* Start of reserve area. */\n  char *_IO_buf_end;  /* End of reserve area. */\n\n  /* The following fields are used to support backing up and undo. */\n  char *_IO_save_base; /* Pointer to start of non-current get area. */\n  char *_IO_backup_base;  /* Pointer to first valid character of backup area */\n  char *_IO_save_end; /* Pointer to end of non-current get area. */\n\n  struct _IO_marker *_markers;\n\n  struct _IO_FILE *_chain;\n\n  int _fileno;\n  int _flags2;\n  __off_t _old_offset; /* This used to be _offset but it's too small.  */\n\n  /* 1+column number of pbase(); 0 is unknown. */\n  unsigned short _cur_column;\n  signed char _vtable_offset;\n  char _shortbuf[1];\n\n  _IO_lock_t *_lock;\n#ifdef _IO_USE_OLD_IO_FILE\n};\n```\n\n如何理解上面提到的“指向下一个空闲的VFD？” 请跳转到3.3节内容。\n\n*   lruMoreRecently\n    \n\n该成员指向比该VFD最近更常使用的虚拟文件描述符。\n\n*   lruLessRecently\n    \n\n指向此LRU虚拟句柄池中比该VFD最近更不常用的虚拟文件描述符。\n\n*   fileSize\n    \n\n如果当前VFD是指向文件不是临时文件，则表示当前文件的大小。\n\n*   fileName\n    \n\n文件名，对于未使用的VFD，则其值为NULL。注意，这里的fileName是动态malloc的内存空间，在关闭该VFD虚拟文件描述符时候，需要free掉指针的内存空间。\n\n*   fileFlags\n    \n\n文件权限标记，比如当该文件不存在且open()的第二个标记参数或上O\\_CREATE时，则该参数设置文件的所有者、所属组、其他用户的文件读、写和执行权限。\n\n*   fileMode\n    \n\n用于打开/重打开（open()）文件的标记。比如O\\_RDONLY （只读）、O\\_WRONLY（只写）或O\\_RDWR（读写）等模式。如下所示：\n\n```\n#define PG_MODE_MASK_OWNER        (S_IRWXG | S_IRWXO)\n/*\n * Mode mask for data directory permissions that also allows group read/execute.\n */\n#define PG_MODE_MASK_GROUP      (S_IWGRP | S_IRWXO)\n\n/* Default mode for creating directories */\n#define PG_DIR_MODE_OWNER      S_IRWXU\n\n/* Mode for creating directories that allows group read/execute */\n#define PG_DIR_MODE_GROUP      (S_IRWXU | S_IRGRP | S_IXGRP)\n\n/* Default mode for creating files */\n#define PG_FILE_MODE_OWNER        (S_IRUSR | S_IWUSR)\n\n/* Mode for creating files that allows group read */\n#define PG_FILE_MODE_GROUP      (S_IRUSR | S_IWUSR | S_IRGRP)\n```\n\n  \n\n在介绍完Vfd结构类型的成员列表之后，接下来重点剖析PostgreSQL是如何使用Vfd数据结构来实现LRU句柄资源池的。\n\n  \n\n3\\. LRU虚拟文件描述符池\n===============\n\n对于PostgreSQL，每个后台进程（更多关于后台进程的概念，请阅读 [PostgreSQL数据库体系架构](http://mp.weixin.qq.com/s?__biz=MzkyNDE2NDU3Ng==&mid=2247484692&idx=1&sn=a30bb33e945c803957fd7ba8e520037d&chksm=c1db4d9bf6acc48d656659803fb21143f122150d2bdb41ab9876046b16636e09bc95d4b3bf11&scene=21#wechat_redirect)）都使用一个所谓的LRU（Last Recently Use，最近最少使用）池来管理所有已打开的虚拟文件描述符VFD。对于该LRU池中的每一个VFD，都分别一一对应磁盘上已打开的文件。每个进程都拥有者自己私有的LRU池和文件描述符VFD。当进程需要打开文件中，直接从自己的LRU池中申请VFD，当不需要时释放VFD（包括对应的内存段、缓存资源、快照等）。\n\n3.1 VfdCache全局数组\n----------------\n\nPostgreSQL通过在fd.c文件中定义一个指向Vfd数据类型的全局指针变量VfdCache来开始管理LRU池。它是虚拟文件描述符数组指针，它在需要时动态增长。VfdCache作为LRU池的头部（类似于链表中的头指针，关于链表的更多知识请阅读 [数据结构之链表（一）](http://mp.weixin.qq.com/s?__biz=MzkyNDE2NDU3Ng==&mid=2247484233&idx=1&sn=1c94e7be74c008c7acd281b956d902de&chksm=c1db4bc6f6acc2d0794ba9cc4c39e67fbe76ed09451da0394d149e3cd791d7d34f5ef6053c92&scene=21#wechat_redirect)）。\n\n对于VfdCache指针变量的定义如下所示：\n\n```\nstatic Vfd *VfdCache;\nstatic Size SizeVfdCache = 0;\n\n/*\n * Number of file descriptors known to be in use by VFD entries.\n */\nstatic int  nfile = 0;\n```\n\n这里有3个重要的变量，分别是：VfdCache、SizeVfdCache 和nfile。VfdCache指向LRU池头部，SizeVfdCache 表示当前LRU池的大小。nfile表示当前LRU池中已使用的VFD虚拟文件描述符句柄数量。\n\n  \n\n3.2 VfdCache数组初始化\n-----------------\n\nVfdCache数组指针变量在postmanster进程起来之前，会进行初始化操作。并且置fd成员的值为VFD\\_CLOSED, 表示该文件描述符fd不可用。该初始化过程由函数InitFileAccess()完成。\n\n```\nAssert(SizeVfdCache == 0);  /* call me only once */\n\n/* initialize cache header entry */\nVfdCache = (Vfd *) malloc(sizeof(Vfd));\nif (VfdCache == NULL)\n  ereport(FATAL,\n      (errcode(ERRCODE_OUT_OF_MEMORY),\n       errmsg(\"out of memory\")));\n\nMemSet((char *) &(VfdCache[0]), 0, sizeof(Vfd));\nVfdCache->fd = VFD_CLOSED;\n\n```\n\n  \n\n注意，VfdCache\\[0\\]不是一个可用的VFD，它是整个LRU池的头节点（即头指针）。当初始化完成之后，VfdCache指向堆空间中的某个地址，示意图如下：  \n   \n\n![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e186d5ef6af64c8f97fff6aa3e3e94f9~tplv-k3u1fbpfcp-zoom-1.image)\n\n因为全局变量SizeVfdCache 动态记录着VfdCache池的大小，所以这里SizeVfdCache将会被置为1。因为此时VfdCache指向LRU池的头部。虽然VFD\\[0\\]不是一个可用的VFD，但它是唯一指向该LRU池，充当头节点的作用。\n\n  \n\n```\n{\n     . . . //省略若干\n    SizeVfdCache = 1;\n    /* register proc-exit hook to ensure temp files are dropped at exit \n     */\n    on_proc_exit(AtProcExit_Files, 0);\n}\n```\n\n同时on\\_proc\\_exit()将注册一个回调函数，用于确保临时文件在进程退出时候能被删除。每当打开一个文件时，内部会根据打开文件的类型初始化Vfd结构体数据类型中的数据成员fdstate。在进程退出时候会根据fdstate成员的不同值，分别调用对应的函数进行情理操作。如下代码所示：\n\n```\nswitch (desc->kind)\n{\n  case AllocateDescFile:\n    result = fclose(desc->desc.file);\n    break;\n  case AllocateDescPipe:\n    result = pclose(desc->desc.file);\n    break;\n  case AllocateDescDir:\n    result = closedir(desc->desc.dir);\n    break;\n  case AllocateDescRawFD:\n    result = close(desc->desc.fd);\n    break;\n  default:\n    elog(ERROR, \"AllocateDesc kind not recognized\");\n    result = 0;      /* keep compiler quiet */\n    break;\n}\n```\n\n  \n\n3.3 LRU池结构图\n-----------\n\nLRU池是一个双向链表，开始和结束于元素VfdCache\\[0\\]， 元素0是特殊节点，它不代表一个文件，其中fd字段总是等于VFD\\_CLOSED。元素0是一个头节点，它标明了LRU池的开始/结束。只有当前真正打开（分配了FD）的VFD元素在LRU池中。\n\n虽然LRU池是双向链表，但是Vfd结构中并没有指针，而是通过lruMoreRecently、lruLessRecently这两个int类型的成员变量实现了双向链表中的next和prev指针的功能。\n\n对于LRU池中的每个VFD，均使用成员lruMoreRecently、lruLessRecently链接两个VFD变量，通过lruMoreRecently成员数组下标链接最近更常使用的VFD；而通过lruLessRecently成员数组下标链接最近不常用的VFD。如下图所示：\n\n![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66e5923b91534ca58b6c52837cc8a0ac~tplv-k3u1fbpfcp-zoom-1.image)\n\n其中VfdCache\\[0\\]充当该链接池的头节点（特殊VFD）；另外该LRU池的尾元素VfdCache\\[0\\]通过lruLessRecently成员链接到VfdCache\\[0\\]头部，而VfdCache\\[0\\]头节点通过lruMoreRecently成员链接到VfdCache\\[n\\]。这样就能够很方便地通过VfdCache\\[0\\]头节点找到该池中最近最少使用的VFD。\n\n当然，这个LRU池的大小同样是受到操作系统对进程打开文件描述符数据的限制是一样的。在PostgreSQL中，与max\\_safe\\_fds变量的值极其相关。\n\n### 3.3.1 从LRU池获取VFD\n\n在3.1节中说过，postmaster进程起来时候，会对VfdCache指针变量分配一个Vfd类型大小内存空间。但是此时，还没有可使用的VfdCache虚拟文件句柄，正如前面提到的，VfdCache\\[0\\]充当双向链表头节点的功能，所以它是不会存储有效的VFD的。因此，在第一次尝试获取VFD时候，进程会先走AllocateVfd()函数以分配有效的可用的VFD变量。\n\nVfdCache在分配VFD时候，其采取的方案是成倍的申请（最小的VFD申请数量是32）。比如在第一次初始化VfdCache内存空间时候，在成功申请内存空间的情况下，会将SizeVfdCache变量置为1。该变量记录着当前VfdCache申请的VFD个数。首次调用AllocateVfd()时，因为SizeVfdCache = 1，所以小于32，则本次申请32个VFD变量内存空间。VFD申请示意图如下所示：  \n\n![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52519608ba6e463aa7d38559dafa2f6f~tplv-k3u1fbpfcp-zoom-1.image)\n\n  \n其对应的代码参考如下：\n\n```\nSize    newCacheSize = SizeVfdCache * 2;  //InitFileAccess之后,置为1\nVfd       *newVfdCache;\n\nif (newCacheSize < 32)\n  newCacheSize = 32;\n\n/*\n * Be careful not to clobber VfdCache ptr if realloc fails.\n */\nnewVfdCache = (Vfd *) realloc(VfdCache, sizeof(Vfd) * newCacheSize);\nif (newVfdCache == NULL)\n  ereport(ERROR,\n      (errcode(ERRCODE_OUT_OF_MEMORY),\n       errmsg(\"out of memory\")));\nVfdCache = newVfdCache;\n```\n\n当VFD内存空间申请成功之后，便依次对VFD变量中的成员nextFree进行初始化，使其依次指向下一个VFD。因为SizeVfdCache等于1，所以从VfdCache\\[1\\]开始进行初始化。\n\n```\nfor (i = SizeVfdCache; i < newCacheSize; i++)\n{\n  MemSet((char *) &(VfdCache[i]), 0, sizeof(Vfd));\n  VfdCache[i].nextFree = i + 1;  //31 next--> 32\n  VfdCache[i].fd = VFD_CLOSED;\n}\n\nVfdCache[newCacheSize - 1].nextFree = 0;\nVfdCache[0].nextFree = SizeVfdCache;\n\n/*\n * Record the new size\n */\nSizeVfdCache = newCacheSize;  //1, 32, 64, 128, 256 . . .\n```\n\n当nextFree成员初始化之后，重置SizeVfdCache 全局变量的值为当前申请的VFD个数（依次是32、64、128、256、512知道满足不超过操作系统对进程可打开文件描述符的限制为止）。\n\n```\nfile = VfdCache[0].nextFree;\nVfdCache[0].nextFree = VfdCache[file].nextFree;\n\nreturn file;\n```\n\n然后返回可用的VfdCache，即VFD。这里file即为VFD位于VfdCache数组的下标。因为是第一次申请VFD，所以从VfdCache\\[0\\]开始依次使用VFD，这里file分别是：1、2、3、4、5、6 . . . ，知道可使用的VFD小于本次所申请的32个时候，继续重新申请VFD，这时候是申请64个。如下图所示，获取LRU池中的VfdCache\\[1\\]变量。  \n\n![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f32f080044094510bf8b863287686803~tplv-k3u1fbpfcp-zoom-1.image)\n\n当获取到可用的VFD数组元素之后，接下来就开始调用系统函数来打开所指定的文件，然后将open()系统函数返回的文件描述符fd初始化给VFD中的fd成员变量。同时分别将本次打开文件的模式以及文件权限（若是创建文件的话）初始化给VFD中的成员fileFlags和fileMode。并将其他的成员根据实际情况进行初始化。\n\n```\nfile = AllocateVfd();\nvfdP = &VfdCache[file];\n\n/* Close excess kernel FDs. \n * 关闭多余的内核fd.\n */\nReleaseLruFiles();\n\nvfdP->fd = BasicOpenFilePerm(fileName, fileFlags, fileMode);\n\nif (vfdP->fd < 0)\n{\n  int      save_errno = errno;\n\n  FreeVfd(file);\n  free(fnamecopy);\n  errno = save_errno;\n  return -1;\n}\n++nfile;\nDO_DB(elog(LOG, \"PathNameOpenFile: success %d\",\n       vfdP->fd));\n\nvfdP->fileName = fnamecopy;\n/* Saved flags are adjusted to be OK for re-opening file */\nvfdP->fileFlags = fileFlags & ~(O_CREAT | O_TRUNC | O_EXCL);\nvfdP->fileMode   = fileMode;\nvfdP->fileSize   = 0;\nvfdP->fdstate   = 0x0;\nvfdP->resowner   = NULL;\n```\n\n到这里时，VFD已经是一个可提供给进程使用的虚拟文件描述符了。给上层的是该VFD位于LRU池中的数组下标nextFree，而不会对外提供VFD中的成员fd值。接下来的最后一个任务就是初始化VFD中的两个数组下标成员lruMoreRecently和lruMoreRecently。使它们分别指向VfdCache头节点。以便于快速从VfdCache\\[0\\]找到该LRU池中最近常使用、不常使用的VFD。以便于在LRU池超出操作系统文件描述符限制时根据LRU策略删除不常用的VFD。对应代码如下：\n\n```\nvfdP = &VfdCache[file];\nvfdP->lruMoreRecently = 0;\nvfdP->lruLessRecently = VfdCache[0].lruLessRecently;\nVfdCache[0].lruLessRecently = file;\nVfdCache[vfdP->lruLessRecently].lruMoreRecently = file;\n```\n\n4\\. 总结\n======\n\n本文通过结合二进制代码，详细地分析了PostgreSQL数据库分配，管理文件的内部原理。因为操作系统对进程同时能够打开的fd数量是强烈的限制，并且在超过限制后会触发一些内核级别的问题，所以如何使用，管理文件压缩就变成了PostgreSQL数据库中的一个急切重要的功能点。通过使用VFD虚拟文件转换映射的方式，可以给逐步一种假象是文件缩小fd是数量用之不竭，这样的好处是进程不必过多地去担心，判断fd的细节处理问题。调用相应的系列位于fd.c文件中封装的函数接口即可，屏蔽掉了系统函数调用错误代码的逻辑判断处理。\n\n\n"
        },
        "author_user_info": {
            "user_id": "4459274891961112",
            "user_name": "君子黎",
            "company": "公众号: 君子黎",
            "job_title": "C/C++工程师",
            "avatar_large": "https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/4fe2a07bff0a20f5ef8571fc3ab65ccd~300x300.image",
            "level": 1,
            "description": "擅长C/C++、PostgreSQL数据库、编译原理、数据结构&算法、Linux、TCP/IP",
            "followee_count": 0,
            "follower_count": 9,
            "post_article_count": 6,
            "digg_article_count": 5,
            "got_digg_count": 18,
            "got_view_count": 3674,
            "post_shortmsg_count": 0,
            "digg_shortmsg_count": 0,
            "isfollowed": false,
            "favorable_author": 0,
            "power": 54,
            "study_point": 0,
            "university": {
                "university_id": "0",
                "name": "",
                "logo": ""
            },
            "major": {
                "major_id": "0",
                "parent_id": "0",
                "name": ""
            },
            "student_status": 0,
            "select_event_count": 0,
            "select_online_course_count": 0,
            "identity": 0,
            "is_select_annual": false,
            "select_annual_rank": 0,
            "annual_list_type": 0,
            "extraMap": {}
        },
        "category": {
            "category_id": "6809637769959178254",
            "category_name": "后端",
            "category_url": "backend",
            "rank": 1,
            "ctime": 1457483880,
            "mtime": 1432503193,
            "show_type": 3
        },
        "tags": [
            {
                "id": 2546527,
                "tag_id": "6809640408797167623",
                "tag_name": "后端",
                "color": "#C679FF",
                "icon": "https://lc-gold-cdn.xitu.io/d83da9d012ddb7ae85f4.png",
                "back_ground": "",
                "show_navi": 1,
                "ctime": 1435971556,
                "mtime": 1620964564,
                "id_type": 9,
                "tag_alias": "",
                "post_article_count": 44009,
                "concern_user_count": 409491
            }
        ],
        "user_interact": {
            "id": 6961323610631831560,
            "omitempty": 2,
            "user_id": 0,
            "is_digg": false,
            "is_follow": false,
            "is_collect": false
        },
        "org": {
            "org_info": null,
            "org_user": null,
            "is_followed": false
        }
    }
}

export default {
    details: details
}