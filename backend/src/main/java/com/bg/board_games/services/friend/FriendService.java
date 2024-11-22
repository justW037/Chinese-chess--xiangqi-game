package com.bg.board_games.services.friend;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bg.board_games.components.JwtTokenUtil;
import com.bg.board_games.dtos.friendDtos.FriendRequestDTO;
import com.bg.board_games.enums.FriendStatus;
import com.bg.board_games.exceptions.DataNotFoundException;
import com.bg.board_games.exceptions.PermissionDenyException;
import com.bg.board_games.mappers.FriendMapper;
import com.bg.board_games.models.entity.Friend;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.repositories.FriendRepository;
import com.bg.board_games.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FriendService implements IFriendService {
    private final FriendRepository friendRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final FriendMapper friendMapper;
    private final UserRepository userRepository;

    @Override
    public Friend createFriendRequest(String token, FriendRequestDTO friendRequestDTO) throws Exception {
        Long userId = jwtTokenUtil.extractUserId(token);

        if(userId != friendRequestDTO.getUserId()) {
           throw new PermissionDenyException("Can't add friend request , id user not match");
        }
        if(userId == friendRequestDTO.getTargetUserId()) {
            throw new PermissionDenyException("Can't add friend request to user itself");
        }

        if(!userRepository.existsById(friendRequestDTO.getTargetUserId())) {
            throw new DataNotFoundException("Target user not found");
        }

        Optional<Friend> existingFriend = friendRepository.findByUserIds(friendRequestDTO.getUserId(), friendRequestDTO.getTargetUserId());
        if (existingFriend.isPresent()) {
            String existingStatus = existingFriend.get().getStatus();
            if (existingStatus.equals(FriendStatus.FRIEND.name())) {
                throw new PermissionDenyException("You are already friends with this user");
            }
            if (existingStatus.equals(FriendStatus.BLOCKED.name())) {
                throw new PermissionDenyException("Cannot send friend request as the user is blocked");
            }
            if (existingStatus.equals(FriendStatus.PENDING.name())) {
                throw new PermissionDenyException("Friend request already exists");
            }
        }
        Friend newFriendRequest = friendMapper.toFriend(friendRequestDTO, FriendStatus.PENDING.name());

        return friendRepository.save(newFriendRequest);
    }

    @Override
    public Friend acceptFriendRequest(String token,  Long friendId) throws Exception{
        Long userId = jwtTokenUtil.extractUserId(token);

        Friend existedFriend = friendRepository.findById(friendId).orElseThrow(  () -> new DataNotFoundException("Friend not found"));

        if(userId != existedFriend.getUser2().getId()) {
            throw new PermissionDenyException("Can't accept friend request, you are not user get friend request");
        }
        if(!existedFriend.getStatus().equals(FriendStatus.PENDING.name())) {
            throw new PermissionDenyException("Can't accept friend request, no friend request found");
        }
  
        friendMapper.updateFriendFromDTO(existedFriend, FriendStatus.FRIEND.name());

        return friendRepository.save(existedFriend);
    }

    @Override
    public Friend blockFriend(String token, Long targetId) throws Exception {
        Long userId = jwtTokenUtil.extractUserId(token);

        if(!userRepository.existsById(targetId)) {
            throw new DataNotFoundException("Target user not found");
        }

        if(userId == targetId) {
            throw new PermissionDenyException("Can't block user itself");
        }

        Optional<Friend> existingFriend = friendRepository.findByUserIds(userId, targetId);
        

        Friend friend;
        if (existingFriend.isPresent()) {
            friend = existingFriend.get();

            if (friend.getStatus().equals(FriendStatus.BLOCKED.name())) {
                throw new PermissionDenyException("Friend already blocked");
            }
            if (friend.getUser2().getId().equals(userId)) {
                User tempUser = friend.getUser1();
                friend.setUser1(friend.getUser2());
                friend.setUser2(tempUser);
            }
            friendMapper.updateFriendFromDTO(friend, FriendStatus.BLOCKED.name());
            return friendRepository.save(friend);    
        } 

        FriendRequestDTO friendRequestDTO = new FriendRequestDTO(userId, targetId);
        friend = friendMapper.toFriend(friendRequestDTO, FriendStatus.BLOCKED.name());
        return friendRepository.save(friend);    
    }

    @Override
    public void deleteFriend(String token, Long targetId) throws Exception {
        Long userId = jwtTokenUtil.extractUserId(token);

        if(!userRepository.existsById(targetId)) {
            throw new DataNotFoundException("Target user not found");
        }

        if(userId == targetId) {
            throw new PermissionDenyException("Can't unfriend itself");
        }

        Friend existingFriend = friendRepository.findByUserIds(userId, targetId).orElseThrow(() -> new DataNotFoundException("Friend not found"));

        if(existingFriend.getStatus().equals(FriendStatus.PENDING.name())) {
            throw new PermissionDenyException("Can't unfriend, you are not friend with this user");
        }
        if(existingFriend.getStatus().equals(FriendStatus.BLOCKED.name()) && userId != existingFriend.getUser1().getId()) {
            throw new PermissionDenyException("You are not allowed to unfriend this user");
        }

        friendRepository.delete(existingFriend);
    }

    @Override
    public Page<Friend> getFriendList(String token, Long userId, String status, Pageable pageable) throws Exception {
        Long userIdExtract = jwtTokenUtil.extractUserId(token);
        if (userId != userIdExtract) {
            throw new PermissionDenyException("Can't get friend list, id not match");
        }

        //check status value
        if (status != null && !status.isEmpty()) {
            
            try {
                FriendStatus.valueOf(status.toUpperCase()); 
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status value: " + status);
            }
        }

        return friendRepository.findFriendsByUserIdAndStatus(userId, status, pageable);

    }
    

}
