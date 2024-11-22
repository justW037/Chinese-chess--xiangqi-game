package com.bg.board_games.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.bg.board_games.dtos.friendDtos.FriendRequestDTO;
import com.bg.board_games.models.entity.Friend;
import com.bg.board_games.responses.friend.FriendInfoResponse;
import com.bg.board_games.responses.friend.FriendResponse;

@Mapper(componentModel = "spring")
public interface FriendMapper {

    @Mapping(target = "user1.id", source = "friendRegisterDTO.userId")
    @Mapping(target = "user2.id", source = "friendRegisterDTO.targetUserId")
    @Mapping(target = "status", source = "status")
    Friend toFriend(FriendRequestDTO friendRegisterDTO, String status);


    @Mapping(target = "status", source = "status")
    void updateFriendFromDTO(@MappingTarget Friend friend,  String status);

    @Mapping(target = "userId", source = "friend.user1.id")
    @Mapping(target = "targetUserId", source = "friend.user2.id")
    FriendInfoResponse toFriendInfoResponse(Friend friend);
   
     
    default FriendResponse toFriendResponse(Friend friend, Long currentUserId) {
        FriendResponse response = new FriendResponse();
        if (friend.getUser1().getId().equals(currentUserId)) {
            response.setUserId(friend.getUser2().getId());
            response.setUsername(friend.getUser2().getUsername());
            response.setCountry(friend.getUser2().getCountry());
        } else {
            response.setUserId(friend.getUser1().getId());
            response.setUsername(friend.getUser1().getUsername());
            response.setCountry(friend.getUser1().getCountry());
        }
        response.setStatus(friend.getStatus());
        return response;
    }

}
