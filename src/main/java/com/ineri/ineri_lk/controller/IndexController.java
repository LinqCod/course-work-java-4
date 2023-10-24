package com.ineri.ineri_lk.controller;

import com.ineri.ineri_lk.model.Form;
import com.ineri.ineri_lk.model.Role;
import com.ineri.ineri_lk.model.User;
import com.ineri.ineri_lk.service.impl.FormServiceImpl;
import com.ineri.ineri_lk.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * @author linqcod
 */

@Controller
public class IndexController {

    @Autowired
    private AuthController authController;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private FormServiceImpl formService;

    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("index");
        mv = authController.setupUser(mv);
        return mv;
    }

    @GetMapping("/contacts")
    public ModelAndView showContact() {
        ModelAndView mv = new ModelAndView("view_contacts");
        mv = authController.setupUser(mv);
        return mv;
    }

    @GetMapping("/control-panel")
    public String showControl() {
        return "redirect:/users";
    }

    @GetMapping("/cookie")
    public ModelAndView showCookie() {
        ModelAndView mv = new ModelAndView("view_cookie");
        mv = authController.setupUser(mv);
        return mv;
    }

    @GetMapping("/view-template")
    public ModelAndView showViewTemplate() {
        ModelAndView mv = new ModelAndView("view_template");
        mv = authController.setupUser(mv);
        return mv;
    }

    @GetMapping("/edit-template")
    public ModelAndView showEditTemplate() {
        ModelAndView mv = new ModelAndView("edit_template");
        mv = authController.setupUser(mv);
        return mv;
    }

    @GetMapping("/add-template")
    public ModelAndView showAddTemplate() {
        ModelAndView mv = new ModelAndView("add_template");
        mv = authController.setupUser(mv);
        return mv;
    }

    @GetMapping("/forms")
    public ModelAndView getAll() {
        ModelAndView mv = new ModelAndView("view_admin_forms");
        mv = authController.setupUser(mv);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        List<Form> forms;
        if (userServiceImpl.getUserByUsername(username).getRoles().contains(Role.ROLE_ADMIN)) {
            forms = formService.getAll();
        }
        else {
            forms = formService.getAllByUsername(username);
        }

        mv.addObject("forms", forms);
        return mv;
    }

}
