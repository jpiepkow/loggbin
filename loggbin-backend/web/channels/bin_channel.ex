defmodule Loggbin.BinChannel do
	use Loggbin.Web, :channel

	def join("bins:" <> bin_id ,_params,socket) do
		data = case Loggbin.Bins.check_exists(bin_id) do
  		true -> {:ok, assign(socket, :bin_id, bin_id)}
  		false -> {:error, %{"err"  => "bin does not exist"}} 
  	end
		
	end
end