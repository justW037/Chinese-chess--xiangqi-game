package com.bg.board_games.services.user;

import com.bg.board_games.dtos.userDtos.UserRegisterDTO;
import com.bg.board_games.dtos.userDtos.UserUpdateDTO;
import com.bg.board_games.models.entity.User;

public interface IUserService {
    User createUser(UserRegisterDTO userDTO) throws Exception;
    String login(String email, String password) throws Exception;
    User getUserDetailsFromToken(String token) throws Exception;
    User updateUser(String token, Long userId, UserUpdateDTO updatedUserDTO) throws Exception;
    void deleteUser(String token ,Long userId) throws Exception;
    User getUserById(Long userId) throws Exception;
}
