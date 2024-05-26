
//Creates a span as an error message
const createErrorMessage = (olderSibling) => {
      if (olderSibling.classList.contains('query-wrapper') || olderSibling.classList.contains('agreement')) {
            //
      }
      else {
            olderSibling.style.outline = 'none'
            olderSibling.style.border = '1px solid red'
      }
      const parentElement = olderSibling.parentNode
      const span = document.createElement('span')
      span.classList.add('error-message')
      parentElement.insertBefore(span, olderSibling.nextSibling)
      return span
}


const isEmpty = (node, errorMsg) => {
      if (node === null || !node.value) {
            const errorMsgSpan = createErrorMessage(node)
            errorMsgSpan.textContent = errorMsg
            return false
      }
      else if(node.checked === false){
            const div = document.querySelector('.agreement')
            const errorMsgSpan = createErrorMessage(div)
            errorMsgSpan.style.margin = '-20px 0 20px 0'
            errorMsgSpan.textContent = errorMsg
            return false
      }
      else {
            if (node.nextElementSibling.tagName === 'SPAN') {
                  node.nextSibling.remove()
            }
            node.style.outline = '2px solid limegreen'
            return true
      }
}

//Checks if input is valid
//Will create an error message if not
//Else return true with outline green as valid
const isValidExp = (regExp, node, errorMsg) => {
      if (!regExp.test(node.value)) {
            if (node.nextElementSibling === null || node.nextElementSibling.tagName !== 'SPAN') {
                  const errorMsgSpan = createErrorMessage(node)
                  if (!node.value) {
                        errorMsgSpan.textContent = "This field is required"
                  }
                  else {
                        errorMsgSpan.textContent = errorMsg
                  }
            }
            return false
      }
      //
      else {
            if (node.nextElementSibling.tagName === 'SPAN') {
                  node.nextSibling.remove()
            }
            node.style.outline = '2px solid limegreen'
            return true
      }
}



const contactForm = document.getElementById('form-button')

contactForm.addEventListener('click', e => {

      let isValid = []
      e.preventDefault()

      // Input DOMs
      const firstName = document.getElementById('firstName')
      const lastName = document.getElementById('lastName')
      const email = document.getElementById('email')
      const query = document.getElementsByName('queryType')
      const message = document.getElementById('message')
      const agreement = document.getElementById('consent')

      //Loops query radio input values
      let queryValue = document.querySelector('.query-wrapper')
      for (let index = 0; index < query.length; index++) {
            if (query[index].checked) {
                  queryValue = query[index]
                  break
            }

      }


      const nameRegExp = /^[A-Za-z\s]{3,}$/
      const emailPattern = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/g

      const defaultMsg = "This field is required"
      const errorMsg = "Please enter a valid name"
      const emailErrorMsg = "Please enter a valid email address"
      const queryErrorMsg = "Please select a query type"
      const agreementErrorMsg = "To submit this form, please consent to being contacted"

      isValid.push(isValidExp(nameRegExp, firstName, errorMsg))
      isValid.push(isValidExp(nameRegExp, lastName, errorMsg))
      isValid.push(isValidExp(emailPattern, email, emailErrorMsg))

      isValid.push(isEmpty(message, defaultMsg))
      isValid.push(isEmpty(queryValue, queryErrorMsg))
      isValid.push(isEmpty(agreement, agreementErrorMsg))

      console.log(isValid)
      console.log(queryValue)
      console.log(agreement.checked)

      /* console.log(firstName.value)
      console.log(lastName.value)
      console.log(email.value)
      console.log(queryValue)
      console.log(message.value)
      console.log(agreement.value) */
})