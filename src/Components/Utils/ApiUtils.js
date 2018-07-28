import {API_BASE_URL, ACCESS_TOKEN} from "../Constants/index";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'Origin'
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    )
};

//User

export function login(loginRequest){
    return request({
        url:API_BASE_URL+"user/login",
        method:'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest){
    return request({
        url:API_BASE_URL+"user/register",
        method:'POST',
        body:JSON.stringify(registerRequest),
    });
}

export function checkUserNameAvailability(username){
    // console.log(username)
    return request(
        {
            
            url:API_BASE_URL+"user/isUsernameAvailable?username="+username,
            method:'GET'
        }
    )
}
export function checkEmailAvailability(email){
    return request({
        url:API_BASE_URL+"user/isEmailRegistered?email="+email,
        method:'GET'
    })
}

export function getUserProfile(username){
    return request({
        url:API_BASE_URL+"profile/get/"+username,
        method:'GET'
    })
}

export function getCurrentUser(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"user/me",
        method:'GET',
    })
}

export function searchUser(searchString){
    return request({
        url: API_BASE_URL+"user/search?search="+searchString,
        method:'GET'
    })
}

//Education

export function getEducationDetails(username){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"education/get?username="+username,
        method:'GET'

    })
}

export function addEducationDetails(educationDetails){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"education/add",
        method:"POST",
        body: JSON.stringify(educationDetails)

    })
}



export function updateEducationDetails(educationDetails){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"education/update",
        method:"POST",
        body: JSON.stringify(educationDetails)

    })
}
export function deleteEducationDetails(educationId){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"education/delete/"+educationId,
        method:"GET",
    })
}

//skills

export function addSkillsDetails(skillsDetails){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"skills/add",
        method:"POST",
        body: JSON.stringify(skillsDetails)

    })
}

export function getSkillsDetails(username){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"skills/get?username="+username,
        method:'GET'

    })
}

export function updateSkillsDetails(skillsDetails){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"skills/update",
        method:"POST",
        body: JSON.stringify(skillsDetails)

    })
}

export function deleteSkillsDetails(skillId){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"skills/delete/"+skillId,
        method:"GET",
    })
}

//internship
export function addInternshipDetails(internDetails){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"internship/add",
        method:"POST",
        body: JSON.stringify(internDetails)

    })
}

export function getInternshipDetails(username){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"internship/get?username="+username,
        method:'GET'

    })
}

export function updateInternshipDetails(internDetails){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"internship/update",
        method:"POST",
        body: JSON.stringify(internDetails)

    })
}

export function deleteInternshipDetails(internId){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url:API_BASE_URL+"internship/delete/"+internId,
        method:"GET",
    })
}


// Profile
export function getProfile(username){
    return request({
        url:API_BASE_URL+"profile/get/"+username,
        method:'GET'
    })
}



