const Main = {

    init: function() {
        this.cacheSelector()
        this.bindEvents()
    },

    cacheSelector: function () {
        this.$checkButtons = document.querySelectorAll('#checkButton')
        this.$removeButtons = document.querySelectorAll('.removeButton')
        this.$inputTask = document.querySelector('.inputTask')
        this.$list = document.querySelector('.list')
    },

    bindEvents: function () {
        const self = this

        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click
        })

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        }) 

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)
    },

    Events: {
        checkButton_click: function (e){
            const button = e.target
            const isDone = button.classList.contains('done')

            if(isDone) {
                button.classList.remove('done')
            } else {
                button.classList.add('done')
            }
        },

        removeButton_click: function(e) {
            const li = e.target.parentElement

            li.classList.add('hidden')

            setTimeout(function(){
                li.classList.add('removed')
            }, 300)
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const value =  e.target.value

            if(key == 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <button id="checkButton"></button>
                        <label class="task">${value}</label>
                        <button class="removeButton"></button>
                    </li>
                `
                e.target.value = ''
                this.cacheSelector()
                this.bindEvents()
            }
        }
    }
}

Main.init()