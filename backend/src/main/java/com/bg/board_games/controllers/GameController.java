package com.bg.board_games.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bg.board_games.responses.game.PlayersInMatchResponse;
import com.bg.board_games.services.game.GameService;
import com.bg.board_games.services.point.PointService;
import com.bg.board_games.enums.PointType;
import com.bg.board_games.exceptions.InvalidParamException;
import com.bg.board_games.mappers.PlayerMapper;
import com.bg.board_games.models.entity.Game;
import com.bg.board_games.models.entity.Point;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.models.entity.UserGame;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("${api.prefix}/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;
    private final PlayerMapper playerMapper;
    private final PointService pointService;

    @GetMapping("players")
    public PlayersInMatchResponse getAllPlayerInMatchProcessing(@RequestHeader("Authorization") String authorizationHeader) throws Exception {
        String extractedToken = authorizationHeader.substring(7);
        Game game = gameService.getGame(extractedToken);
        List<UserGame> userGames = game.getUserGames();
        if (userGames.size() != 2) {
            throw new InvalidParamException("Game must have 2 players");
        }
        User user1 = userGames.get(0).getUser();
        User user2 = userGames.get(1).getUser();
        Point point1 = pointService.getPointByUserAndType(user1.getId(), PointType.GAME.name());
        Point point2 = pointService.getPointByUserAndType(user2.getId(), PointType.GAME.name());

        return PlayersInMatchResponse.builder()
            .gameId(game.getId())
            .player1(playerMapper.toPlayerInMatchResponse(user1, point1))
            .player2(playerMapper.toPlayerInMatchResponse(user2, point2))
            .build();
    }
    

}
