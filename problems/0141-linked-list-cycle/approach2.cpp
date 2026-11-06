/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode* head) {
        if (!head) return false; // @viz init
        ListNode* anchor = head; // @viz init
        ListNode* runner = head->next; // @viz init
        long long power = 1, steps = 1; // how far runner may go before anchor jumps up to it // @viz init
        while (runner) { // @viz step
            if (runner == anchor) return true; // runner came back around: a cycle // @viz found
            if (steps == power) { // used up this round: move anchor to runner, double the round // @viz jump
                anchor = runner; // @viz jump
                power *= 2; // @viz jump
                steps = 0; // @viz jump
            }
            runner = runner->next; // @viz step
            ++steps; // @viz step
        }
        return false; // runner fell off the end: no cycle // @viz none
    }
};
