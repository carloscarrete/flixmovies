import { useQuery } from "@tanstack/react-query"
import { People } from "../interfaces/People"

const usePerson = (qrKey: (string | number )[], fetchFn: () => Promise<People>) => {

    const query = useQuery({
        queryKey: qrKey,
        queryFn: fetchFn,
        select: (data) => {
            return data
        }
    })

  return {
    ...query,
    isLoadingPerson: query.isLoading
  }
}

export default usePerson