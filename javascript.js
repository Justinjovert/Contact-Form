
//Creates a span as an error message
const createErrorMessage = (olderSibling) => {
      if (olderSibling.classList.contains('query-wrapper') || olderSibling.classList.contains('agreement')) {
            //Do not outline
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
      //If it is null or has no value, create span error
      if (node === null || !node.value) {
            if (node.nextElementSibling === null || node.nextElementSibling.tagName !== 'SPAN') {
                  const errorMsgSpan = createErrorMessage(node)
                  errorMsgSpan.textContent = errorMsg
            }
            //If there already exists a span error, change textcontent
            else if (node.nextElementSibling.tagName === 'SPAN') {
                  //If query type, do not change error message
                  if (!node.value && !node.classList.contains('query-wrapper')) {
                        node.nextElementSibling.textContent = "This field is required"
                  }
                  else {
                        node.nextElementSibling.textContent = errorMsg
                  }
            }
            return false
      }
      //If agreement/consent checkbox is not checked, create span error
      else if (node.checked === false) {
            const agreementDiv = document.querySelector('.agreement')
            if (agreementDiv.nextElementSibling === null || agreementDiv.nextElementSibling.tagName !== 'SPAN') {
                  const errorMsgSpan = createErrorMessage(agreementDiv)
                  errorMsgSpan.textContent = errorMsg
            }
            return false
      }
      //If success
      else {
            //Remove span error
            if (node.nextElementSibling !== null && node.nextElementSibling.tagName === 'SPAN') {
                  node.nextSibling.remove()
            }
            //If query-type is now checked, previously not
            if (node.name === 'queryType') {
                  const queryWrapperDiv = node.parentNode.parentNode
                  if (queryWrapperDiv.nextElementSibling !== null && queryWrapperDiv.nextElementSibling.tagName === 'SPAN') {
                        queryWrapperDiv.nextSibling.remove()
                  }
            }
            //If agreement is checked, do not outline checkbox but remove span error
            if (node.checked === true) {
                  const parentDiv = node.parentNode
                  if (parentDiv.nextElementSibling !== null && parentDiv.nextElementSibling.tagName === 'SPAN') {
                        parentDiv.nextSibling.remove()
                  }
            }
            else {
                  node.style.outline = '1px solid hsl(169, 82%, 27%)'
                  node.style.border = '0'
            }
            return true
      }
}

//Checks if input is valid
//Will create an error message if not
//Else return true with outline green as valid
const isValidExp = (regExp, node, errorMsg) => {
      //If it is not a valid regular expression
      if (!regExp.test(node.value)) {
            //Create a span error
            if (node.nextElementSibling === null || node.nextElementSibling.tagName !== 'SPAN') {
                  const errorMsgSpan = createErrorMessage(node)
                  if (!node.value) {
                        errorMsgSpan.textContent = "This field is required"
                  }
                  else {
                        errorMsgSpan.textContent = errorMsg
                  }
            }
            //If there already exists a span error, change textcontent
            else if (node.nextElementSibling.tagName === 'SPAN') {
                  if (!node.value) {
                        node.nextElementSibling.textContent = "This field is required"
                  }
                  else {
                        node.nextElementSibling.textContent = errorMsg
                  }
            }
            return false
      }
      //If it is a valid regular expression
      else {
            if (node.nextElementSibling !== null && node.nextElementSibling.tagName === 'SPAN') {
                  node.nextSibling.remove()
            }
            node.style.outline = '1px solid hsl(169, 82%, 27%)'
            node.style.border = '0'
            return true
      }
}



const contactForm = document.getElementById('form-button')

contactForm.addEventListener('click', e => {

      let isValid = []
      e.preventDefault()

      // Input DOM to reference
      const firstName = document.getElementById('firstName')
      const lastName = document.getElementById('lastName')
      const email = document.getElementById('email')
      const query = document.getElementsByName('queryType')
      const message = document.getElementById('message')
      const agreement = document.getElementById('consent')

      //Loops query radio input values
      //And put the value on variable if checked
      //Otherwise default value for error message
      let queryValue = document.querySelector('.query-wrapper')
      for (let index = 0; index < query.length; index++) {
            if (query[index].checked) {
                  queryValue = query[index]
                  break
            }

      }

      //Regular Expressions
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

      isValid.push(isEmpty(queryValue, queryErrorMsg))
      isValid.push(isEmpty(message, defaultMsg))
      isValid.push(isEmpty(agreement, agreementErrorMsg))

      console.log(isValid)

})

const queryType = document.getElementsByName('queryType')
queryType.forEach(element => {
      element.addEventListener('change', event => {
            queryType.forEach(element => element.parentNode.classList.remove('selected-query'))
            element.parentNode.classList.add('selected-query')
      })
}
)