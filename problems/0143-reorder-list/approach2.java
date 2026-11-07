/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
import java.util.*;

class Solution {
    public void reorderList(ListNode head) {
        ArrayDeque<ListNode> stack = new ArrayDeque<>(); // @viz init
        for (ListNode p = head; p != null; p = p.next) { // push every node; the top of the stack is the tail // @viz push
            stack.push(p); // @viz push
        }
        ListNode cur = head; // @viz insert
        for (int k = (stack.size() - 1) / 2; k > 0; k--) { // this many nodes move from the back // @viz insert
            ListNode last = stack.pop(); // the current tail // @viz insert
            last.next = cur.next; // slip it in right after cur // @viz insert
            cur.next = last; // @viz insert
            cur = last.next; // @viz insert
        }
        stack.peek().next = null; // the node on top is the new tail: cut its old link // @viz cut
    }
}
