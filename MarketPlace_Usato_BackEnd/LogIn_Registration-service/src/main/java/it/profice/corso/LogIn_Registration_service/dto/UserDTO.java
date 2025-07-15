package it.profice.corso.LogIn_Registration_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String uuid;

    private String username;
    private String password;
    private String email;
    private Boolean isLogged;
}
