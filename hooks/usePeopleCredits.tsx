import { useQuery } from "@tanstack/react-query"
import { PeopleCredits } from "../interfaces/People"

const usePeopleCredits = (qrKey: (string | number )[], fetchFn: () => Promise<PeopleCredits>) => {

    const query = useQuery({
        queryKey: qrKey,
        queryFn: fetchFn,
        select: (data) => {
            return data.cast
        }
    })

  return {
    ...query,
    isLoadingPerson: query.isLoading
  }
}

export default usePeopleCredits