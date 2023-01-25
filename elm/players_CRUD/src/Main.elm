module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)

initPlayer : Int -> Player
initPlayer id =
    Player id "" False

type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }

type alias Model =
    { players : List Player
    , newPlayer : Player
    , nextId : Int
    }

type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int

init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    , nextId = 1
    }

update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            { model | newPlayer = model.newPlayer}

        AddPlayer ->
            let
                newPlayer =  model.newPlayer 
                updatedPlayers = List.append model.players [newPlayer]
            in
                { model | players = updatedPlayers, newPlayer = initPlayer (model.nextId + 1), nextId = model.nextId + 1}

        DeletePlayer id ->
            { model | players = List.filter (\p -> p.id /= id) model.players }

        ModifyPlayer id status ->
            { model | players = List.map (\p -> if p.id == id then {p | isActive = status} else p) model.players }

view : Model -> Html Msg
view model =
    div []
      [ h1 [] [ text "Elm Exercise: Players CRUD" ]
      , Html.form [ id "submit-player", onSubmit AddPlayer ] 
        [ input [id "input-player", type_  "text", value model.newPlayer.name, onInput SetName] []
        , button [type_ "sumbit", id "btn-add"] [ text "Add Player" ]
        ]
      , ul [] (List.map viewPlayer model.players)
      ]

viewPlayer : Player -> Html msg
viewPlayer player =
    li [] [ text player.name ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
