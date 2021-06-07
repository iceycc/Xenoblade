import { ref, watch, Ref } from 'vue'
import { useRoute, LocationQueryRaw } from 'vue-router'

const useRouteQuery = (): Record<string, Ref<any>> => {
  const route = useRoute()
  const query = route.query
  const redirect = ref('')
  const otherQuery = ref<LocationQueryRaw | undefined>(undefined)

  const getOtherQuery = (query: LocationQueryRaw) => {
    return Object.keys(query || {}).filter(q => q !== 'redirect').reduce((obj, key) => {
      obj[key] = query[key]
      return obj
    }, {} as LocationQueryRaw)
  }

  otherQuery.value = getOtherQuery(query)

  watch(route, value => {
    const query = value.query
    if (query) {
      redirect.value = query.redirect as string
      otherQuery.value = getOtherQuery(query as LocationQueryRaw)
    }
  }, {
    immediate: true
  })

  return {
    redirect,
    otherQuery
  }
}

export default useRouteQuery
