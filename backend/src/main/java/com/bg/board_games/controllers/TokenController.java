package com.bg.board_games.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bg.board_games.dtos.tokenDtos.GetNewAuthTokenDTO;
import com.bg.board_games.services.token.ITokenService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("${api.prefix}/tokens")
@RequiredArgsConstructor
public class TokenController {
    private final ITokenService tokenService;

    @PostMapping("get-new")
    public String getNewAuthToken(@Valid @RequestBody GetNewAuthTokenDTO getNewAuthTokenDTO) throws Exception {
        return tokenService.getNewToken(getNewAuthTokenDTO.getRefreshToken(), getNewAuthTokenDTO.getUserId());
    }
    

}
