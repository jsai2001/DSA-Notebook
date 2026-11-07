import java.util.*;
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> after = new ArrayList<>(); // after[b] = courses that need b // @viz init
        for (int i = 0; i < numCourses; i++) after.add(new ArrayList<>()); // @viz init
        int[] need = new int[numCourses]; // prerequisites not taken yet // @viz init
        for (int[] p : prerequisites) { // @viz init
            after.get(p[1]).add(p[0]); // @viz init
            need[p[0]]++; // @viz init
        }
        ArrayDeque<Integer> queue = new ArrayDeque<>(); // courses you can take now // @viz start
        for (int c = 0; c < numCourses; c++) if (need[c] == 0) queue.add(c); // @viz start
        int taken = 0; // @viz start
        while (!queue.isEmpty()) { // @viz take
            int c = queue.poll(); // @viz take
            taken++; // @viz take
            for (int next : after.get(c)) // @viz free
                if (--need[next] == 0) queue.add(next); // one fewer prerequisite to wait for // @viz free
        }
        return taken == numCourses; // courses on a cycle never reach need 0 // @viz return
    }
}
