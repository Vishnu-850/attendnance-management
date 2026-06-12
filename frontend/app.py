import matplotlib.pyplot as plt

# Semester-wise data
semesters = ["1-1", "1-2", "2-1", "2-2", "3-1"]
cgpa = [7.00, 7.13, 7.28, 7.52, 8.05]

plt.figure()
plt.plot(semesters, cgpa, marker='o')
plt.xlabel("Semester")
plt.ylabel("CGPA")
plt.title("CGPA Growth Over Semesters")
plt.ylim(6.8, 8.2)
plt.grid(True)

plt.show()
