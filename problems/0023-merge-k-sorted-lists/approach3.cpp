/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include <queue>
#include <vector>
class Solution {
public:
    ListNode* mergeKLists(std::vector<ListNode*>& lists) {
        ListNode dummy; // @viz init
        ListNode* tail = &dummy; // @viz init
        // priority_queue keeps the "largest" on top, so compare with > to get the smallest val
        auto later = [](ListNode* a, ListNode* b) { return a->val > b->val; }; // @viz heads
        std::priority_queue<ListNode*, std::vector<ListNode*>, decltype(later)> heap(later); // @viz heads
        for (ListNode* head : lists) // @viz heads
            if (head) heap.push(head); // one head per non-empty list // @viz heads
        while (!heap.empty()) { // @viz pop
            ListNode* node = heap.top(); // the smallest of all the current heads // @viz pop
            heap.pop(); // @viz pop
            tail->next = node; // @viz attach
            tail = node; // @viz attach
            if (node->next) heap.push(node->next); // the next node of the same list takes its place // @viz push
        }
        return dummy.next; // @viz return
    }
};
