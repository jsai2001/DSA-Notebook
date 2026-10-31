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
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head); // @viz dummy
        Deque<ListNode> stack = new ArrayDeque<>(); // @viz dummy
        for (ListNode node = dummy; node != null; node = node.next) stack.push(node); // push every node, dummy included // @viz push
        for (int k = 0; k < n; k++) stack.pop(); // the last n nodes come off; the n-th one is the target // @viz pop
        ListNode prev = stack.peek(); // now on top: the node just before the target // @viz unlink
        prev.next = prev.next.next; // @viz unlink
        return dummy.next; // @viz return
    }
}
