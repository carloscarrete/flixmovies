import { useQuery } from "@tanstack/react-query"
import { MovieDetail } from "../interfaces/Movies"

const useMovieDetails = (qrKey: (string | number )[], fetchFn: () => Promise<MovieDetail>) => {

    const query = useQuery({
        queryKey: qrKey,
        queryFn: fetchFn,
        select: (data) => {
            return data
        }
    })

  return {
    ...query,
    isLoadingMovieDetails: query.isLoading
  }
}

export default useMovieDetails