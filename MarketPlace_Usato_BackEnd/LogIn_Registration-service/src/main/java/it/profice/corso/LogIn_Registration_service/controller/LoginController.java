package it.profice.corso.LogIn_Registration_service.controller;

import it.profice.corso.LogIn_Registration_service.dto.UserDTO;
import it.profice.corso.LogIn_Registration_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/login")
public class LoginController {

    private final UserService userService;

    @GetMapping("/{uuid}/user")
    public UserDTO findByUuid(@PathVariable String uuid){
        return userService.findByUuid(uuid);
    }

    @GetMapping("/users")
    public List<UserDTO> findAll(){
        return userService.findAll();
    }

    @PostMapping
    public UserDTO saveNewUser(@RequestBody UserDTO userDTO){
        return userService.save(userDTO);
    }

    @PatchMapping("/{uuid}")
    public UserDTO update(@PathVariable String uuid, @RequestBody UserDTO userDTO){
        return userService.update(uuid, userDTO);
    }

    @DeleteMapping
    void deleteByUuid(@PathVariable String uuid){
        userService.deleteByUuid(uuid);
    }
}
