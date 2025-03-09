import { Request, Response } from "express";
import connect from "../config/db";
require("dotenv").config();

export const getAllUsersOnTeams = async (req: Request, res: Response) => {
  try {
    const usersonteam = await new Promise((resolve, reject) => {
      connect.query("SELECT * FROM `usersonteam`", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!usersonteam.length) {
      return res
        .status(404)
        .json({ message: "Nincsenek elérhető felhasználók a csapatokban." });
    }

    return res.json({
      message: "Felhasználók sikeresen lekérve a csapatokban.",
      data: usersonteam,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a felhasználók lekérése során.", error });
  }
};

export const getUsersOnTeamById = async (req: Request, res: Response) => {
  const { teamid } = req.params;

  if (!teamid) {
    return res.status(400).json({ message: "A csapat ID megadása kötelező." });
  }

  try {
    const usersonteam = await new Promise((resolve, reject) => {
      connect.query(
        "SELECT * FROM `usersonteam` WHERE `teamId` = ?",
        [teamid],
        async (err, result) => {
          if (err) reject(err);

          const promises = result.map((usersonteam) =>
            fetch(`https://auth.pollak.info/user/get/${usersonteam.userId}`, {
              method: "GET",
              headers: {
                "x-api-key": process.env.API_KEY!,
                "Content-Type": "application/json",
              },
            }).then((response) => response.json())
          );

          const users = await Promise.all(promises);
          resolve(users);
        }
      );
    });

    if (usersonteam.length <= 0) {
      return res
        .status(404)
        .json({ message: "A megadott csapatban nincsenek felhasználók." });
    }

    return res.json({
      message: "Felhasználók sikeresen lekérve a csapatban.",
      data: usersonteam,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a csapat felhasználóinak lekérése során.",
      error,
    });
  }
};

export const createUsersOnTeam = async (req: Request, res: Response) => {
  const { teamId, userId } = req.body;

  if (!teamId || !userId) {
    return res
      .status(400)
      .json({ message: "A csapat ID és a felhasználó ID megadása kötelező." });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      connect.query(
        "INSERT INTO `usersonteam` (`teamId`, `userId`) VALUES (?, ?);",
        [teamId, userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    return res.json({
      message: "Felhasználó sikeresen hozzáadva a csapathoz.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a felhasználó csapathoz adása során.",
      error,
    });
  }
};

export const deleteUsersOnTeam = async (req: Request, res: Response) => {
  const { teamId, userId } = req.body;

  if (!teamId || !userId) {
    return res
      .status(400)
      .json({ message: "A csapat ID és a felhasználó ID megadása kötelező." });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      connect.query(
        "DELETE FROM `usersonteam` WHERE `usersonteam`.`teamId` = ? AND `usersonteam`.`userId` = ?",
        [teamId, userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (response.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "A megadott csapatban a felhasználó nem található." });
    }

    return res.json({
      message: "Felhasználó sikeresen eltávolítva a csapatból.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a felhasználó csapatból való eltávolítása során.",
      error,
    });
  }
};

export const userJoinByCode = async (req: Request, res: Response) => {
  const inviteCode = req.params.code;
  const userId = req.body.userId;

  if (!inviteCode || !userId) {
    return res.status(400).json({ message: "Minden adat megadása kötelező." });
  }

  try {
    const team = await new Promise((resolve, reject) => {
      connect.query(
        "SELECT `id` FROM team WHERE inviteCode = ?",
        [inviteCode],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (!team.length) {
      return res
        .status(404)
        .json({ message: "A megadott invite kód nem található." });
    }

    const response = await new Promise((resolve, reject) => {
      connect.query(
        "INSERT INTO `usersonteam` (`teamId`, `userId`) VALUES (?, ?);",
        [team[0].id, userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    return res.json({
      message: "Felhasználó sikeresen hozzáadva a csapathoz.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a felhasználó csapathoz adása során.",
      error,
    });
  }
};
