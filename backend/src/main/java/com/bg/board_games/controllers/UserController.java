package com.bg.board_games.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bg.board_games.dtos.userDtos.UserLoginDTO;
import com.bg.board_games.dtos.userDtos.UserRegisterDTO;
import com.bg.board_games.dtos.userDtos.UserUpdateDTO;
import com.bg.board_games.enums.PointType;
import com.bg.board_games.exceptions.DataNotFoundException;
import com.bg.board_games.exceptions.ExpiredTokenException;
import com.bg.board_games.exceptions.PermissionDenyException;
import com.bg.board_games.mappers.LoginMapper;
import com.bg.board_games.mappers.UserMapper;
import com.bg.board_games.models.entity.Point;
import com.bg.board_games.models.entity.Token;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.responses.user.LoginResponse;
import com.bg.board_games.responses.user.RegisterResponse;
import com.bg.board_games.responses.user.UserDetailResponse;
import com.bg.board_games.services.point.PointService;
import com.bg.board_games.services.token.ITokenService;
import com.bg.board_games.services.user.IUserService;
import com.bg.board_games.utils.ValidationUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    private final ITokenService tokenService;
    private final UserMapper userMapper;
    private final ValidationUtils validationUtils;
    private final LoginMapper loginMapper;
    private final PointService pointService;

    @GetMapping("test")
    public String method() {
        return "anonymous";
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRegisterDTO userDTO, BindingResult result) throws Exception {
        RegisterResponse registerResponse = new RegisterResponse();

        validationUtils.getErrorMessages(result);

        if (!userDTO.getPassword().equals(userDTO.getRetypePassword())) {
            registerResponse.setMessage("User register password not match");
            return ResponseEntity.badRequest().body(registerResponse);
        }

        User user = userService.createUser(userDTO);
        pointService.addPoint(user.getId(), 100, PointType.GAME.name());

        registerResponse.setMessage("Register successfully!");
        UserDetailResponse  userDetailResponse = userMapper.toUserDetailResponse(user);
        registerResponse.setUser(userDetailResponse);
        return ResponseEntity.ok(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody UserLoginDTO userLoginDTO) throws Exception {
            String token = userService.login(
                    userLoginDTO.getEmail(),
                    userLoginDTO.getPassword());
            User userDetail = userService.getUserDetailsFromToken(token);

            Token refreshToken = tokenService.refreshToken(userDetail);

            return ResponseEntity.ok(loginMapper.toLoginResponse(userDetail, token, refreshToken));
    }

    @GetMapping("/details")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<UserDetailResponse> getUserDetails(
            @RequestHeader("Authorization") String authorizationHeader) throws Exception {
                String extractedToken = authorizationHeader.substring(7);
                User user = userService.getUserDetailsFromToken(extractedToken);
                UserDetailResponse  userDetailResponse = userMapper.toUserDetailResponse(user);
                return ResponseEntity.ok(userDetailResponse);
    }

    @PutMapping("/details/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> updateUserDetails(
            @PathVariable Long userId,
            @RequestBody UserUpdateDTO updatedUserDTO,
            @RequestHeader("Authorization") String authorizationHeader) throws Exception {
    
                String extractedToken = authorizationHeader.substring(7);
                User user = userService.getUserDetailsFromToken(extractedToken);
                if (user.getId() != userId) {
                    ResponseEntity.badRequest().body("Cannot update user information, id not match");
                }
                User updatedUser = userService.updateUser(extractedToken, userId, updatedUserDTO);
                UserDetailResponse  userDetailResponse = userMapper.toUserDetailResponse(updatedUser);

                return ResponseEntity.ok(userDetailResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) throws Exception {
        String extractedToken = authorizationHeader.substring(7);
        userService.deleteUser(extractedToken, id);
       
        return ResponseEntity.ok().body("Deleted successfully user id: " + id);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailResponse> getUserById(@PathVariable Long userId) throws Exception {
        User user = userService.getUserById(userId);
        UserDetailResponse  userDetailResponse = userMapper.toUserDetailResponse(user);
        return ResponseEntity.ok(userDetailResponse);
    }

    
}
