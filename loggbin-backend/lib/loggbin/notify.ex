defmodule Loggbin.Notify do
	use GenServer
	def start_link(opts \\ []) do
    {:ok, _pid} = GenServer.start_link(__MODULE__, [], opts)
  end 

  def new_data(conn) do
    GenServer.cast(:notify, {:handle_data, conn})
  end

  def init([]) do
    {:ok, %{}}
  end
    def handle_cast({:handle_data, conn}, state) do
      Loggbin.Endpoint.broadcast("bins:" <> conn.params["id"], "log", 
        %{
          "data"  => conn.body_params["s"],
          "type" => conn.body_params["type"] || "log",
          "groupId" => conn.body_params["groupId"] || ""
        })
    {:noreply, state}
  end	
end