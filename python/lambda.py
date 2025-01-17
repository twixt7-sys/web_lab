#using a dictionary to store the data

person = {
    {"name": "John", "location": "New York", "age": 30},
    {"name": "Jane", "location": "London", "age": 25},
    {"name": "Bob", "location": "Paris", "age": 35}
}

#sorting the dictionary by location
person.sort(key=lambda x: x["location"])