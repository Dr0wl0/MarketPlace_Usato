package it.profice.corso.LogIn_Registration_service.controller;

import it.profice.corso.LogIn_Registration_service.dto.UserDTO;
import it.profice.corso.LogIn_Registration_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/login")
public class LoginController {

    private final UserService userService;

    @GetMapping("/{uuid}/user")
    public UserDTO findByUuid(@PathVariable String uuid){
        return userService.findByUuid(uuid);
    }

    @PostMapping("/log")
    public UserDTO login(@RequestBody UserDTO userDTO){
      UserDTO userDtoOpt = userService.findByUsername(userDTO.getUsername());
//      if(userDtoOpt.getPassword().equals(userDTO.getPassword())){
//          userService.log(userDtoOpt);
//      }
      return userDtoOpt;
    }

    @GetMapping("/users")
    public List<UserDTO> findAll(){
        return userService.findAll();
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO saveNewUser(@RequestBody UserDTO userDTO){
        return userService.save(userDTO);
    }

    @PatchMapping("/{uuid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserDTO update(@PathVariable String uuid, @RequestBody UserDTO userDTO){
        return userService.update(uuid, userDTO);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteByUuid(@PathVariable String uuid){
        userService.deleteByUuid(uuid);
    }
}
