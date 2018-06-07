defmodule Loggbin.Proxy do
  use Loggbin.Web, :controller
  def log(conn, _params) do
  	data = case Loggbin.Bins.check_exists(conn.params["id"]) do
  		true -> Loggbin.Notify.new_data(conn) 
  		false -> false
  	end
  	case data do
  		false -> conn |> put_status(400) |> json(%{"err" => "bin does not exist"})
  		:ok -> 	json conn, %{"recieved" => true}
  	end
  end
  def createbin(conn, _params) do
  	id = Loggbin.Bins.create_bin(conn)	
    json conn, %{"created" => id}
  end
  def nothing(conn,_params) do
    json conn, %{"nothing" => true} 
  end
end
