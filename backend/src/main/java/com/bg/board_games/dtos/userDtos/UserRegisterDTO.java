package com.bg.board_games.dtos.userDtos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRegisterDTO {
    @JsonProperty("username")
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @NotBlank(message = "Password cannot be blank")
    @JsonProperty("password")
    private String password;

    @NotBlank(message = "Retype password cannot be blank")
    @JsonProperty("retype_password")
    private String retypePassword;

    @Email
    @NotBlank(message = "Email cannot be blank")
    @JsonProperty("email")
    private String email;

    @NotBlank(message = "Role cannot be blank")
    @Pattern(regexp = "USER|ADMIN", message = "Role must be either USER or ADMIN")
    @JsonProperty("role")
    private String role;

    @JsonProperty("dob")
    private LocalDate dateOfBirth;

    @JsonProperty("country")
    private String country;
}
