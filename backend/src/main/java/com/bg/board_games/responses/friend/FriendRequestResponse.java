package com.bg.board_games.responses.friend;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FriendRequestResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("friend_request")
    private FriendInfoResponse friendResponse;
}
