import java.util.*;
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        boolean[] done = new boolean[numCourses]; // @viz init
        int[] order = new int[numCourses]; // @viz init
        int k = 0; // @viz init
        while (k < numCourses) { // one round: take every course whose prerequisites are all done // @viz round
            int[] need = new int[numCourses]; // prerequisites not done yet, per course // @viz count
            for (int[] p : prerequisites) // p[1] must come before p[0] // @viz count
                if (!done[p[1]]) need[p[0]]++; // @viz count
            List<Integer> ready = new ArrayList<>(); // @viz ready
            for (int c = 0; c < numCourses; c++) // @viz ready
                if (!done[c] && need[c] == 0) ready.add(c); // @viz ready
            if (ready.isEmpty()) return new int[0]; // courses are left, but each waits on another: a cycle // @viz stuck
            for (int c : ready) { // @viz take
                done[c] = true; // @viz take
                order[k++] = c; // @viz take
            }
        }
        return order; // @viz return
    }
}
