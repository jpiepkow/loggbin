defmodule Loggbin.Bins do
	use GenServer
  use Loggbin.Web, :controller
  @chars "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789" |> String.split("", trim: true)
  def string_of_length(length) do
    Enum.reduce((1..length), [], fn (_i,acc) -> 
      [Enum.random(@chars) | acc]
      end) |> Enum.join("")
  end
  defp getSecret([val]) do
    val
  end
  defp getSecret([]) do
    nil
  end  
  def get_till_unique(map) do
    val = string_of_length(6)
      case Map.fetch(map,val) do
        :error -> val
        {:ok,val} -> get_till_unique(map)
      end
  end
	def start_link(opts \\ []) do
    {:ok, _pid} = GenServer.start_link(__MODULE__, [], opts)
  end 

  def create_bin(conn) do
    GenServer.call(:bins, {:create_bin, conn})
  end
  def check_exists(id) do
    GenServer.call(:bins, {:does_exist, id})
  end

  def init([]) do
    {:ok, %{}}
  end
  defp schedule_cleanup(id) do
    Process.send_after(self(), {:work,id}, 48 * 60 * 60 * 1000 ) # In 48 hours
  end
  def handle_info({:work,id}, state) do
    {:noreply, Map.delete(state,id)}
  end
  def handle_call({:create_bin, conn}, _from, bin) do
    binId = get_till_unique(bin)
    secret = getSecret(get_req_header(conn,"x-loggbin-secret"))
    # set a key to skip getting bin cleaned up after 48 hours.
    case secret === process.SECRET_NO_CLEAN do
      true -> nil
      false -> schedule_cleanup(binId)
    end
    {:reply, binId,Map.put_new(bin, binId, "temp")}
  end	
  def handle_call({:does_exist, id}, _from, bin) do
      case Map.fetch(bin,id) do
        :error -> {:reply, false, bin} 
        {:ok,val} -> {:reply, true, bin} 
      end
  end
end