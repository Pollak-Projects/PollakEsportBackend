# Pollak-Backend

The backend of the Pollak E-Sports

## CheckList
- Users : Done || CRUD + getById
- Teams : Done || CRUD + getByName
- Variants : Done || CRUD + getByName
- Types : Done || CRUD + getByName
- Games : Done || CRUD + getById
- Rounds : Done || CRUD + getById
- Seeds : Done || CRUD + getById
- TeamsOnSeed : CRD + getUsersByTeamId (Without update method, because its useless and we dont have a primary id. Just delete and recreate)
- UsersOnTeam : CRD + getUsersByTeamId (Without update method, because its useless and we dont have a primary id. Just delete and recreate) 
- RoundsOnGame : CRD + getRoundsByGameId (Without update method, because its useless and we dont have a primary id. Just delete and recreate) 
- GameVariants : CRD + getGameVariantsByGameId (Without update method, because its useless and we dont have a primary id. Just delete and recreate)  
- Sessions : TODO
- Tokens : TODO
- AuthController : TODO
- Invite Code : TODO
