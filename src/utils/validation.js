import zxcvbn from "zxcvbn"

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePasswordStrength(password) {
  const strength = zxcvbn(password);
  let strengthMeter = { status: "", color: "" }
  const result = (value) => {
    switch (value.score) {
      case 0:
        return "Very poor";
      case 1:
        return "Poor";
      case 2:
        return "Good";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        return "";
    }

  }
  const color = (value) => {
    switch (value.score) {
      case 0:
        return "!text-veryWeak";
      case 1:
        return "!text-veryWeak";
      case 2:
        return "!text-veryWeak";
      case 3:
        return "!text-strong";
      case 4:
        return "!text-primary";
      default:
        return "";

    }
  }
  const border = (value) => {
    switch (value.score) {
      case 0:
        return "!border-veryWeak hover:border-veryWeak focus:border-veryWeak";
      case 1:
        return "!border-weak hover:border-weak focus:!border-weak";
      case 2:
        return "!border-good hover:border-good focus:border-good";
      case 3:
        return "!border-strong hover:border-strong focus:border-strong";
      case 4:
        return "!border-veryStrong hover:border-veryStrong focus:border-veryStrong";
      default:
        return "";

    }
  }
  if (password.length > 0) {
    strengthMeter = { status: result(strength), border: border(strength), color: color(strength) }
  }
  return strengthMeter

}

export const errorMessage = (email, password) => {
  if (!isValidEmail(email) && !(validatePasswordStrength(password).status === "Strong" || validatePasswordStrength(password).status === "Very strong")) {
    return {
      emailError: true,
      passwordError: true,
      invalidUser: false,
      message: "Please enter a valid email and a Strong password"
    }
  }
  if (!isValidEmail(email) && (validatePasswordStrength(password).status === "Strong" || validatePasswordStrength(password).status === "Very strong")) {
    return {
      emailError: true,
      passwordError: false,
      invalidUser: false,
      message: "Please enter a valid email"
    }
  }
  if (isValidEmail(email) && !(validatePasswordStrength(password).status === "Strong" || validatePasswordStrength(password).status === "Very strong")) {
    return {
      emailError: false,
      passwordError: true,
      invalidUser: false,
      message: "Please enter a strong password"
    }
  }
  if (isValidEmail(email) && (validatePasswordStrength(password).status === "Strong" || validatePasswordStrength(password).status === "Very strong")) {
    return {
      emailError: false,
      passwordError: false,
      invalidUser: false,
      message: ""
    }
  }
}

export const confirmPassCheck = (pass, confirmPass) => {
  if (pass !== confirmPass) {
    return {
      error: true,
      message: "Passwords doesn't match",
    }
  }
  else return{
    error:false,
    message:""
  }
}