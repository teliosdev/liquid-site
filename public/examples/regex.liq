#! allow document

# This regex matches both the protocol
#  and the domain we're using
r = r/(https?:\/\/)([\w\.]+\.\w{2,3})(\/[\/\w]+)?/ig
s = document.URL

result = r.exec(s)
for(i = 0, i < result.length, i++) {
    # Format and output the result
    console.log("Group #{i}: #{result[i]}")
}