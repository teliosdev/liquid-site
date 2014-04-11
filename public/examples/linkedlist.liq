#! allow JSON

class LinkedList {
    initialize: (value, next) ->{
        this.value = value
        this.next  = next
    }
}

create-linked-list = (array) ->{
    prev = null
    for(i = array.length - 1, i >= 0, i--) {
        node = new LinkedList(array[i], prev)
        prev = node
    }
    return prev
}

array = [1, 2, 3, 4, 5, 6, 7]
head = create-linked-list(array)

#            1    2    3    4
console.log(head.next.next.next.value)

return JSON.stringify(head)