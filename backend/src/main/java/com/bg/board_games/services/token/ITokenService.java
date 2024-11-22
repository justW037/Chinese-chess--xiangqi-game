package com.bg.board_games.services.token;

import com.bg.board_games.models.entity.Token;
import com.bg.board_games.models.entity.User;

public interface ITokenService {
    Token refreshToken(User user);
    String getNewToken(String refreshToken, Long userId) throws Exception;
}
