package com.bg.board_games.services.user;

import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bg.board_games.components.JwtTokenUtil;
import com.bg.board_games.dtos.userDtos.UserRegisterDTO;
import com.bg.board_games.dtos.userDtos.UserUpdateDTO;
import com.bg.board_games.enums.Role;
import com.bg.board_games.exceptions.DataNotFoundException;
import com.bg.board_games.exceptions.ExpiredTokenException;
import com.bg.board_games.exceptions.PermissionDenyException;
import com.bg.board_games.mappers.UserMapper;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public User createUser(UserRegisterDTO userDTO) throws Exception{
        String email = userDTO.getEmail();
        String username = userDTO.getUsername();

        if(userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        if(userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (!Role.USER.name().equalsIgnoreCase(userDTO.getRole())) {
            throw new IllegalArgumentException("Role must be USER");
        }

        User newUser = userMapper.toUser(userDTO);
       
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        newUser.setPassword(encodedPassword);
    
        return userRepository.save(newUser);
    }

    @Override
    public String login(String email, String password) throws Exception{
        User user = userRepository.findByEmail(email).orElseThrow(
            () -> new DataNotFoundException("User not found")
        );

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password, user.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        String token = jwtTokenUtil.generateToken(user);
        return token;
    }

    @Override
    public User getUserDetailsFromToken(String token) throws Exception {
        String email = jwtTokenUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow(
            () -> new DataNotFoundException("User not found")
        );
        return user;
    }

    @Transactional
    @Override
    public User updateUser(String token, Long userId, UserUpdateDTO updatedUserDTO) throws Exception{
        Long id = jwtTokenUtil.extractUserId(token);
        if (id != userId) {
            throw new PermissionDenyException("Can't update user , id not match");
        }

        if (updatedUserDTO.getPassword() != null
        && !updatedUserDTO.getPassword().isEmpty()) {
            if(!updatedUserDTO.getPassword().equals(updatedUserDTO.getRetypePassword())) {
                throw new DataNotFoundException("Password and retype password not the same");
            }

        }
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new DataNotFoundException("User not found"));

        Optional<User> existingUsernameUser = userRepository.findByUsername(updatedUserDTO.getUsername());
        if (existingUsernameUser.isPresent() && !existingUsernameUser.get().getId().equals(userId)) {
            throw new DataIntegrityViolationException("Username already exists");
        }

        if (!passwordEncoder.matches(updatedUserDTO.getPassword(), existingUser.getPassword())) {
            throw new IllegalArgumentException("Password not match");
        }

        userMapper.updateUserFromDto(updatedUserDTO, existingUser);
 
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(String token , Long userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(()-> new DataNotFoundException("User not found"));
        if (user.getId() != jwtTokenUtil.extractUserId(token)) {
            throw new PermissionDenyException("Can't delete user , id not match");
        }
        userRepository.delete(user);
    }

    @Override
    public User getUserById(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                    .orElseThrow(() -> new DataNotFoundException("User not found"));

        if (!user.getRole().equals(Role.USER.name())) {
            throw new PermissionDenyException("Only users with role USER are allowed");
        }
        return user;
    }

}
