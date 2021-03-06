import {
  InTextMsg,
  OutMsg,
  ApiConfigKit,
  OutTextMsg,
  OutNewsMsg,
  OutCustomMsg,
  InImageMsg,
  OutImageMsg,
  InVoiceMsg,
  OutVoiceMsg,
  InVideoMsg,
  OutVideoMsg,
  InShortVideoMsg,
  InLocationMsg,
  InLinkMsg,
  InSpeechRecognitionResults,
  InFollowEvent,
  InQrCodeEvent,
  InLocationEvent,
  InMenuEvent,
  InTemplateMsgEvent,
  InShakearoundUserShakeEvent,
  InNotDefinedMsg,
  InMsg,
  MsgAdapter,
  InTaskEvent,
  InEnterAgentEvent,
  InBatchJobResultEvent,
  InUpdateUserEvent,
  InUpdatePartyEvent,
  InUpdateTagEvent,
  InSuiteTicket,
  InComponentVerifyTicket,
  InAuthEvent,
  InAuthMpEvent,
  InBatchJobResult,
  InExternalContactEvent,
  InExternalContact,
  InRegisterCorp,
} from 'tnwx';

class MyMsgAdapter implements MsgAdapter {
  processInTaskEvent(inTaskEvent: InTaskEvent): Promise<OutMsg> {
    throw new Error('Method not implemented.');
  }

  processInEnterAgentEvent(inEnterAgentEvent: InEnterAgentEvent): Promise<OutMsg> {
    throw new Error('Method not implemented.');
  }

  processInBatchJobResultEvent(inBatchJobResultEvent: InBatchJobResultEvent): Promise<OutMsg> {
    throw new Error('Method not implemented.');
  }

  processInUpdateUserEvent(inUpdateUserEvent: InUpdateUserEvent): Promise<OutMsg> {
    throw new Error('Method not implemented.');
  }

  processInUpdatePartyEvent(inUpdatePartyEvent: InUpdatePartyEvent): Promise<OutMsg> {
    throw new Error('Method not implemented.');
  }

  processInUpdateTagEvent(inUpdateTagEvent: InUpdateTagEvent): Promise<OutMsg> {
    throw new Error('Method not implemented.');
  }

  processInSuiteTicket(inSuiteTicket: InSuiteTicket): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInComponentVerifyTicket(inComponentVerifyTicket: InComponentVerifyTicket): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInAuthEvent(inAuthEvent: InAuthEvent): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInAuthMpEvent(inAuthMpEvent: InAuthMpEvent): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInBatchJobResult(inBatchJobResult: InBatchJobResult): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInExternalContactEvent(inExternalContactEvent: InExternalContactEvent): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInExternalContact(inExternalContact: InExternalContact): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInRegisterCorp(inRegisterCorp: InRegisterCorp): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg> {
    return Promise.resolve(undefined);
  }

  renderOutTextMsg(inMsg: InMsg, content?: string): Promise<OutTextMsg> {
    return Promise.resolve(undefined);
  }

  processInWxVerifyDispatchEvent(inMsg: InMsg, content?: string): Promise<OutTextMsg> {
    return Promise.resolve(undefined);
  }
  processInMassEvent(inMsg: InMsg, content?: string): Promise<OutTextMsg> {
    return Promise.resolve(undefined);
  }
}

export class MsgController extends MyMsgAdapter {

  async processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg> {
    let outMsg: any;
    let content = '????????????????????? \n\n ?????????????????????';
    if ('???????????????????????????' == inTextMsg.getContent) {
      // ?????????????????? ????????????????????????????????????????????????
      if (ApiConfigKit.getApiConfig.getAppId == 'wx614c453e0d1dcd12') {
        content = '??????????????????????????? \n\nhttps://github.com/javen205/weixin_guide';
        outMsg = new OutTextMsg(inTextMsg);
        outMsg.setContent(content);
      } else {
        content = '??????????????????????????? \n\nhttps://github.com/javen205/TNWX';
        outMsg = new OutTextMsg(inTextMsg);
        outMsg.setContent(content);
      }

    } else if ('????????????' == inTextMsg.getContent) {
      // ????????????????????????????????????1?????????????????????????????????????????????8???????????????
      outMsg = new OutNewsMsg(inTextMsg);
      outMsg.addArticle('?????????????????????', 'IJPay ?????????????????????',
        'https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png', 'https://gitee.com/javen205/IJPay');
      outMsg.addArticle('jfinal-weixin', '???????????????????????????',
        'https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png', 'https://gitee.com/JFinal/jfinal-weixin');
    } else {
      outMsg = new OutTextMsg(inTextMsg);
      outMsg.setContent(content);
      // outMsg.setContent(content);
      // ??????????????????PC?????????
      // outMsg = new OutCustomMsg(inTextMsg);
      // console.log('??????????????????PC?????????');

    }
    return outMsg;
  }

  async processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg> {
    const outMsg = new OutImageMsg(inImageMsg);
    outMsg.setMediaId = inImageMsg.getMediaId;
    return outMsg;
  }

  async processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg> {
    const outMsg = new OutVoiceMsg(inVoiceMsg);
    outMsg.setMediaId = inVoiceMsg.getMediaId;
    return outMsg;
  }

  async processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg> {
    const outMsg = new OutVideoMsg(inVideoMsg);
    outMsg.setMediaId = inVideoMsg.getMediaId;
    outMsg.setDescription = '????????????';
    outMsg.setTitle = '????????????';
    return outMsg;
  }

  async processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg> {
    const outMsg = new OutVideoMsg(inShortVideoMsg);
    outMsg.setMediaId = inShortVideoMsg.getMediaId;
    outMsg.setDescription = 'TypeScript + Node.js ?????????????????????';
    outMsg.setTitle = '???????????????';
    return outMsg;
  }

  async processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inLocationMsg,
      '????????????... \n\nX:' + inLocationMsg.getLocation_X + ' Y:' + inLocationMsg.getLocation_Y + '\n\n' + inLocationMsg.getLabel);
  }

  async processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg> {
    const text = new OutTextMsg(inLinkMsg);
    text.setContent('???????????????...' + inLinkMsg.getUrl);
    return text;
  }

  async processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg> {
    const text = new OutTextMsg(inSpeechRecognitionResults);
    text.setContent('??????????????????...' + inSpeechRecognitionResults.getRecognition);
    return text;
  }

  async processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg> {

    if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
      return this.renderOutTextMsg(inFollowEvent,
        '?????????????????? ?????????');
    } else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
      console.error('???????????????' + inFollowEvent.getFromUserName);
      return this.renderOutTextMsg(inFollowEvent);
    } else {
      return this.renderOutTextMsg(inFollowEvent);
    }
  }

  async processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg> {
    console.log(inQrCodeEvent.getFromUserName);
    if (InQrCodeEvent.EVENT_INQRCODE_SUBSCRIBE == inQrCodeEvent.getEvent) {
      console.debug('??????????????????' + inQrCodeEvent.getFromUserName);
      return this.renderOutTextMsg(inQrCodeEvent,
        '???????????????????????????????????????' + inQrCodeEvent.getEventKey);
    } else if (InQrCodeEvent.EVENT_INQRCODE_SCAN == inQrCodeEvent.getEvent) {
      console.debug('??????????????????' + inQrCodeEvent.getFromUserName);
      return this.renderOutTextMsg(inQrCodeEvent);
    } else {
      return this.renderOutTextMsg(inQrCodeEvent);
    }
  }

  async processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg> {
    console.debug('???????????????????????????' + inLocationEvent.getFromUserName);

    return this.renderOutTextMsg(inLocationEvent,
      '??????????????????' + inLocationEvent.getLatitude);
  }

  async processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg> {
    console.debug('???????????????' + inMenuEvent.getFromUserName);

    return this.renderOutTextMsg(inMenuEvent,
      '????????????????????????' + inMenuEvent.getEventKey);
  }

  async processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg> {
    console.debug('?????????????????????' + inTemplateMsgEvent.getFromUserName + ' ' + inTemplateMsgEvent.getStatus);
    return this.renderOutTextMsg(inTemplateMsgEvent,
      '?????????????????????' + inTemplateMsgEvent.getStatus);
  }

  async processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): Promise<OutMsg> {
    console.debug('??????????????????' + inShakearoundUserShakeEvent.getFromUserName + ' ' + inShakearoundUserShakeEvent.getUuid);
    return this.renderOutTextMsg(inShakearoundUserShakeEvent,
      'uuid???' + inShakearoundUserShakeEvent.getUuid);
  }

  async processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inNotDefinedMsg,
      '????????????');
  }

  async renderOutTextMsg(inMsg: InMsg, content?: string): Promise<OutTextMsg> {
    const outMsg = new OutTextMsg(inMsg);
    outMsg.setContent(content ? content : ' ');
    return outMsg;
  }
  async processInWxVerifyDispatchEvent(inMsg: InMsg, content?: string): Promise<OutTextMsg> {
    const outMsg = new OutTextMsg(inMsg);
    outMsg.setContent(content ? content : ' ');
    return outMsg;
  }
  async processInMassEvent(inMsg: InMsg, content?: string): Promise<OutTextMsg> {
    const outMsg = new OutTextMsg(inMsg);
    outMsg.setContent(content ? content : ' ');
    return outMsg;
  }
}
