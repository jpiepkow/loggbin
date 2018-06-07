defmodule Loggbin.Router do
  use Loggbin.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Loggbin do
    pipe_through :api
    post "/r/:id", Proxy, :log
    options "/createbin", Proxy, :nothing
    post "/createbin", Proxy, :createbin
  end
end
