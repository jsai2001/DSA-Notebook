import java.util.*;
class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length; // @viz init
        Integer[] order = new Integer[n]; // @viz init
        for (int i = 0; i < n; i++) order[i] = i; // @viz init
        Arrays.sort(order, (x, y) -> position[y] - position[x]); // closest to the target first // @viz init
        double[] stack = new double[n]; // arrival time of each fleet's front car // @viz init
        int top = 0; // @viz init
        for (int i : order) { // @viz push
            stack[top++] = (double) (target - position[i]) / speed[i]; // @viz push
            if (top >= 2 && stack[top - 1] <= stack[top - 2]) // it would arrive no later than the fleet ahead: it joins // @viz merge
                top--; // @viz merge
        }
        return top; // @viz return
    }
}
