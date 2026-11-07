import java.util.*;
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> after = new ArrayList<>(); // after[b] = courses that need b // @viz init
        for (int i = 0; i < numCourses; i++) after.add(new ArrayList<>()); // @viz init
        int[] need = new int[numCourses]; // prerequisites not taken yet // @viz init
        for (int[] p : prerequisites) { // @viz init
            after.get(p[1]).add(p[0]); // @viz init
            need[p[0]]++; // @viz init
        }
        int[] order = new int[numCourses]; // @viz start
        int head = 0, tail = 0; // order doubles as the queue: order[head..tail) is waiting // @viz start
        for (int c = 0; c < numCourses; c++) if (need[c] == 0) order[tail++] = c; // courses you can take now // @viz start
        while (head < tail) { // @viz take
            int c = order[head++]; // @viz take
            for (int next : after.get(c)) // @viz free
                if (--need[next] == 0) order[tail++] = next; // all of its prerequisites are taken now // @viz free
        }
        return tail == numCourses ? order : new int[0]; // some course never reached 0: a cycle // @viz return
    }
}
