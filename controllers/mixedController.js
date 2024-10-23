const connect = require("../config/db");

const getAllGamesForCards = async (req, res) => {
    try{
        const games = await new Promise(async (resolve, reject) => {
            connect.query(`
            SELECT 
                g.id AS game_id,
                g.name AS game_name,
                g.playerCount,
                g.playerPerTeam,
                g.requiredForPrize,
                g.status AS game_status,
                v.id AS variant_id,
                v.name AS variant_name,
                mt.id AS matchtype_id,
                mt.type AS match_type
            FROM 
                game g
            JOIN 
                gamevariants gv ON g.id = gv.gameId
            JOIN 
                variant v ON gv.variantId = v.id
            JOIN 
                matchtype mt ON gv.typeId = mt.id;
            `, (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(games);
    } catch (error){ res.status(500).json(error); }
};

const getDataForBrackets = async (req, res) => {

    const gameId = req.params.gameid;

    try{
        const data = await new Promise(async (resolve, reject) => {
            connect.query(`
                    SELECT 
                        t1.name as teamA_name,
                        t2.name as teamB_name,
                        r.number as round_number
                    FROM 
                        roundsongame rg
                    JOIN 
                        seed s ON rg.roundId = s.roundId
                    JOIN 
                        teamsonseed ts ON s.id = ts.seedId
                    JOIN 
                        team t1 ON t1.id = ts.teamOneId
                    JOIN 
                        team t2 ON t2.id = ts.teamTwoId
                    JOIN 
                        round r ON rg.roundId = r.id
                    WHERE 
                        rg.gameId = ?
                `, [gameId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        const formattedData = formatRounds(data)

        return res.json(formattedData);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllGamesForCards,
    getDataForBrackets
}

const formatRounds = (results) => {

    let seedCounter = 1;
  
    const roundsMap = results.reduce((acc, row) => {
      const roundTitle = `Round ${row.round_number}`;
      if (!acc[roundTitle]) {
        acc[roundTitle] = {
          title: roundTitle,
          seeds: []
        };
      }
      
      acc[roundTitle].seeds.push({
        id: seedCounter++,
        date: new Date().toDateString(), 
        teams: [
          { name: row.teamA_name }, 
          { name: row.teamB_name }
        ]
      });
      
      return acc;
    }, {});
  
    return Object.values(roundsMap);
  };