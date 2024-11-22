package com.bg.board_games.services.game;

import java.util.List;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;

import com.bg.board_games.components.JwtTokenUtil;
import com.bg.board_games.enums.GameStatus;
import com.bg.board_games.mappers.GameMapper;
import com.bg.board_games.models.entity.Game;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.models.entity.UserGame;
import com.bg.board_games.repositories.GameRepository;
import com.bg.board_games.repositories.UserGameRepository;
import com.bg.board_games.repositories.UserRepository;

import jakarta.persistence.Access;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService implements IGameService {
    private final GameRepository gameRepository;
    private final UserGameRepository userGameRepository;
    private final UserRepository userRepository; 
    private final GameMapper gameMapper;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public Game addGame(List<Long> userIds) throws Exception {
        Game savedGame = gameRepository.save(Game.builder().startTime(LocalDateTime.now()).status(GameStatus.IN_PROGRESS.name()).build());

        for (Long userId : userIds) {
            if(!userRepository.existsById(userId)){
                throw new Exception("User not found");
            }
            UserGame userGame = gameMapper.toUserGame(userId, savedGame.getId(), 0);
            userGameRepository.save(userGame);
        }

        return savedGame;
    }

    @Override
    public Game updateGame(Long gameId, String status, Long winnerId) throws Exception {
        if(!userRepository.existsById(winnerId)){
            throw new Exception("User not found");
        }
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new Exception("Game not found"));
        gameMapper.updateGame(status, winnerId, LocalDateTime.now(), game);
        return gameRepository.save(game);
    }

    @Override
    public Game getGame(String token) throws Exception {
        Long userId = jwtTokenUtil.extractUserId(token);
        if(!userRepository.existsById(userId)){
            throw new Exception("User not found");
        }
        return gameRepository.findInProgressGameByUserId(userId).orElseThrow(() -> new Exception("Game not found"));
    }

}
