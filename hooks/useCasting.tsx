import { useQuery } from "@tanstack/react-query"
import { Cast } from "../interfaces/Cast"

const useCasting = (qrKey: (string | number )[], fetchFn: () => Promise<Cast>) => {

    const query = useQuery({
        queryKey: qrKey,
        queryFn: fetchFn,
        select: (data) => {
            return data.cast
        }
    })

  return {
    ...query,
    isLoadingCast: query.isLoading
  }
}

export default useCasting