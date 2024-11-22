package com.bg.board_games.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bg.board_games.models.entity.Token;
import com.bg.board_games.models.entity.User;

import java.util.List;


public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByUser(User user);
    Token findByRefreshToken(String token);
}


