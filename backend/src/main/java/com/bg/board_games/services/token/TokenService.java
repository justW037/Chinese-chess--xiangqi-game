package com.bg.board_games.services.token;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bg.board_games.components.JwtTokenUtil;
import com.bg.board_games.exceptions.DataNotFoundException;
import com.bg.board_games.exceptions.ExpiredTokenException;
import com.bg.board_games.exceptions.PermissionDenyException;
import com.bg.board_games.models.entity.Token;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.repositories.TokenRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenService implements ITokenService{

    // @Value("${jwt.expiration}")
    // private int expiration;

    @Value("${jwt.expiration-refresh-token}")
    private int expirationRefreshToken;

    private final TokenRepository tokenRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public Token refreshToken(User user) {
        List<Token> refreshToken = tokenRepository.findByUser(user);
    
        Token validRefreshToken = refreshToken.stream()
                .filter(t -> !t.isRevoked() && !t.isExpired() && t.getExpirationDate().isAfter(LocalDateTime.now()))
                .findFirst()
                .orElse(null);
    
        if (validRefreshToken != null) {
            return validRefreshToken;
        }
        long expirationInSeconds = expirationRefreshToken;
        LocalDateTime expirationDateTime = LocalDateTime.now().plusSeconds(expirationInSeconds);
        Token newRefreshToken  = Token.builder()
                .user(user)
                .revoked(false)
                .expired(false)
                .tokenType("Bearer")
                .expirationDate(expirationDateTime)
                .refreshToken(UUID.randomUUID().toString())
                .build();
    
            tokenRepository.save(newRefreshToken );
            return newRefreshToken;
    }
       
    public String getNewToken(String refreshToken, Long userId) throws Exception{
        Token existingRefreshToken = tokenRepository.findByRefreshToken(refreshToken);
        if(existingRefreshToken == null) {
            throw new DataNotFoundException("Refresh token does not exist");
        }
        if(existingRefreshToken.getExpirationDate().compareTo(LocalDateTime.now()) < 0){
            tokenRepository.delete(existingRefreshToken);
            throw new ExpiredTokenException("Refresh token is expired");
        }
        
        if(existingRefreshToken.getUser().getId() != userId) {
            
            throw new PermissionDenyException("Can't update user , id not match" );
        }

        String token = jwtTokenUtil.generateToken(existingRefreshToken.getUser());
        return token;
    }
    
}
