import { useQuery } from "@tanstack/react-query"
import { Movies } from "../interfaces/Movies"

const useMovies = (qrKey: (string | number )[], fetchFn: () => Promise<Movies>) => {

    const query = useQuery({
        queryKey: qrKey,
        queryFn: fetchFn,
        select: (data) => {
            return data.results
        }
    })

  return {
    ...query,
    isLoadigMovies: query.isLoading
  }
}

export default useMovies