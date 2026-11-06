/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false; // @viz init
        ListNode anchor = head, runner = head.next; // @viz init
        long power = 1, steps = 1; // how far runner may go before anchor jumps up to it // @viz init
        while (runner != null) { // @viz step
            if (runner == anchor) return true; // runner came back around: a cycle // @viz found
            if (steps == power) { // used up this round: move anchor to runner, double the round // @viz jump
                anchor = runner; // @viz jump
                power *= 2; // @viz jump
                steps = 0; // @viz jump
            }
            runner = runner.next; // @viz step
            steps++; // @viz step
        }
        return false; // runner fell off the end: no cycle // @viz none
    }
}
