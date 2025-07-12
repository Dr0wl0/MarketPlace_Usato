package it.profice.corso.LogIn_Registration_service.service;

import it.profice.corso.LogIn_Registration_service.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO save(UserDTO userDTO);
    UserDTO update(String uuid,UserDTO userDTO);
    List<UserDTO> findAll();
    UserDTO findByUuid(String uuid);
    void deleteByUuid(String uuid);
}
