# Pollak-Backend

The backend of the Pollak E-Sports

## CheckList
- Users : Done 
- Teams : Done
- Variants : Done
- Types : Done
- Games : Done 
- Rounds : Done 
- Seeds : Done 
- TeamsOnSeed : Done
- UsersOnTeam : Done
- RoundsOnGame : Done
- GameVariants : Done
- Invite Code : Done (only code, not link)
- PermissionTable : TODO
- PermissionHandlingOnEndpoints : TODO
- Sessions : TODO
- Tokens : TODO
- AuthController : TODO

# Note !Important!
- userId is a temporarily data in every enpoint! It'll be fixed after the tokenhadling is done since we'll get the id from the token.

# Endpoints
## GameController
 - ### GET || url/game/ - getAllGames
 - ### GET || url/game/:id - getGameById
 - ### POST || url/game/- createGame
- - #### Body: name, playerCount, playerPerTeam, requiredForPrize, status
- ### PUT || url/game/:id - updateGame 
- - #### Params: id
- - #### Body: name, playerCount, playerPerTeam, requiredForPrize, status
 - ### DELETE || url/game/:id - deleteGameById

## GameVariantsController

- ### GET || url/gamevariants/ - getAllGameVariants
- ### GET || url/gamevariants/:gameid - getGameVariantByGameId
- ### POST || url/gamevariants/ - createGameVariant
  - #### Body: variantId, gameId, typeId
- ### DELETE || url/gamevariants/ - deleteGameVariant
  - #### Body: variantId, gameId, typeId
  
 ## MixedController

- ### GET || url/mixed/gamesforcards/ - getAllGamesForCards
- ### GET || url/mixed/dataforbrackets/:gameid - getDataForBrackets
  - #### Params: gameid
- ### GET || url/mixed/teams/:teamid - getTeamsWithUsers
  - #### Params: teamid
- ### PUT || url/mixed/scores/ - updateScores
  - #### Body: teamOneId, teamOneScore, teamTwoId, teamTwoScore, seedId
  
## RoundController

- ### GET || url/round/ - getAllRounds
- ### GET || url/round/:id - getRoundById
  - #### Params: id
- ### POST || url/round/ - createRound
  - #### Body: number, title
- ### PUT || url/round/:id - updateRound
  - #### Params: id
  - #### Body: number, title
- ### DELETE || url/round/:id - deleteRound
  - #### Params: id

## RoundsOnGamesController

- ### GET || url/roundsongame/ - getAllRoundsOnGames
- ### GET || url/roundsongame/:gameid - getRoundOnGameById
  - #### Params: gameid
- ### POST || url/roundsongame/ - createRoundsOnGame
  - #### Body: roundId, gameId
- ### DELETE || url/roundsongame/ - deleteRoundsOnGame
  - #### Body: roundId, gameId

## SeedController

- ### GET || url/seed/ - getAllSeeds
- ### GET || url/seed/:id - getSeedById
  - #### Params: id
- ### POST || url/seed/ - createSeed
  - #### Body: roundId, date (default: current date)
- ### PUT || url/seed/:id - updateSeed
  - #### Params: id
  - #### Body: roundId, date (default: current date)
- ### DELETE || url/seed/:id - deleteSeed
  - #### Params: id

## TeamController

- ### GET || url/team/ - getAllTeams
- ### GET || url/team/:name - getTeamByName
  - #### Params: name
- ### GET || url/team/invitecode/:id - getInviteCode
  - #### Params: id
- ### POST || url/team/ - createTeam
  - #### Body: name
- ### PUT || url/team/:id - updateTeam
  - #### Params: id
  - #### Body: name
- ### PUT || url/team/ban/:id - banTeam
  - #### Params: id
- ### PUT || url/team/unban/:id - unbanTeam
  - #### Params: id
- ### DELETE || url/team/:id - deleteTeam
  - #### Params: id

## TeamsOnSeedController

- ### GET || url/teamsonseed/ - getAllTeamsOnSeed
- ### GET || url/teamsonseed/:seedid - getTeamsOnSeedById
  - #### Params: seedid
- ### POST || url/teamsonseed/ - createTeamsOnSeed
  - #### Body: teamOneId, teamTwoId, seedId, teamOneScore, teamTwoScore
- ### DELETE || url/teamsonseed/ - deleteTeamsOnSeed
  - #### Body: teamOneId, teamTwoId, seedId

## TypeController

- ### GET || url/type/ - getAllTypes
- ### GET || url/type/:type - getTypeByType
  - #### Params: type
- ### POST || url/type/ - createType
  - #### Body: type
- ### PUT || url/type/:id - updateType
  - #### Params: id
  - #### Body: type
- ### DELETE || url/type/:id - deleteType
  - #### Params: id

## UserController

- ### GET || url/user/ - getAllUsers
- ### GET || url/user/:id - getUserById
  - #### Params: id
- ### POST || url/user/ - createUser
  - #### Body: username, name, email, om, password
- ### PUT || url/user/:id - updateUser
  - #### Params: id
  - #### Body: username, name, email, om, password
- ### DELETE || url/user/:id - deleteUser
  - #### Params: id

## UsersOnTeamsController

- ### GET || url/usersonteam/ - getAllUsersOnTeams
- ### GET || url/usersonteam/:teamid - getUsersOnTeamById
  - #### Params: teamid
- ### POST || url/usersonteam/ - createUsersOnTeam
  - #### Body: teamId, userId
- ### POST || url/usersonteam/join/:code - userJoinByCode
  - #### Params: inviteCode
  - #### Body: userId
- ### DELETE || url/usersonteam/ - deleteUsersOnTeam
  - #### Body: teamId, userId

## VariantController

- ### GET || url/variant/ - getAllVariants
- ### GET || url/variant/:name - getVariantByName
  - #### Params: name
- ### POST || url/variant/ - createVariant
  - #### Body: name
- ### PUT || url/variant/:id - updateVariant
  - #### Params: id
  - #### Body: name
- ### DELETE || url/variant/:id - deleteVariant
  - #### Params: id
