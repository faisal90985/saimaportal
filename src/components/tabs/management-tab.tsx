"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { managementPosts as initialPosts } from '@/app/lib/data';
import type { ManagementPost, AuthProps, PostType } from '@/app/lib/types';
import { postTypes } from '@/app/lib/types';
import ManagementPostCard from '@/components/management-post-card';

const ManagementTab = ({ 
    isManagementLoggedIn, 
    setIsManagementLoggedIn, 
    managementPassword: pw 
}: AuthProps) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const [posts, setPosts] = useState<ManagementPost[]>(initialPosts);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [editingPost, setEditingPost] = useState<ManagementPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<PostType | ''>('');


  const handleManagementLogin = () => {
    if (password === pw) {
      setIsManagementLoggedIn(true);
      toast({ title: "Management login successful." });
    } else {
      toast({ title: "Invalid management password.", variant: "destructive" });
    }
    setPassword('');
  };
  
  const resetForm = () => {
    setEditingPost(null);
    setTitle('');
    setContent('');
    setType('');
    setShowForm(false);
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !type) {
      toast({ title: "Please fill all fields.", variant: "destructive" });
      return;
    }

    const post: ManagementPost = {
      id: editingPost ? editingPost.id : Date.now().toString(),
      title,
      content,
      type,
      timestamp: Date.now(),
    };
    
    if (editingPost) {
        setPosts(posts.map(p => p.id === post.id ? post : p));
        toast({ title: "Post updated successfully." });
    } else {
        setPosts([post, ...posts]);
        toast({ title: "Post published successfully." });
    }
    resetForm();
  };
  
  const handleEdit = (post: ManagementPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setType(post.type);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
        setPosts(posts.filter(p => p.id !== id));
        toast({ title: "Post deleted." });
    }
  }


  if (!isManagementLoggedIn) {
    return (
        <div className='space-y-6'>
            <Card className="max-w-md mx-auto">
                <CardHeader>
                <CardTitle className="font-headline">Management Access</CardTitle>
                <CardDescription>Login to post updates. For public announcements, please check below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <Input
                    type="password"
                    placeholder="Management Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleManagementLogin()}
                />
                <Button onClick={handleManagementLogin} className="w-full">Management Login</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Management Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {posts.sort((a,b) => b.timestamp - a.timestamp).map(post => (
                        <ManagementPostCard key={post.id} post={post} canManage={false} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        {showForm || editingPost ? (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{editingPost ? 'Edit' : 'Post'} Management Update</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <Select onValueChange={(value) => setType(value as PostType)} value={type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Post Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {postTypes.map(pt => <SelectItem key={pt} value={pt}>{pt}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                        <div className="flex gap-2">
                            <Button type="submit" className="w-full">{editingPost ? 'Update' : 'Post'} Update</Button>
                            <Button type="button" variant="outline" className="w-full" onClick={resetForm}>Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        ) : (
             <Button onClick={() => setShowForm(true)} className="w-full">Post New Update</Button>
        )}
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Published Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {posts.sort((a,b) => b.timestamp - a.timestamp).map(post => (
                    <ManagementPostCard key={post.id} post={post} canManage={true} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </CardContent>
        </Card>
        <Button variant="outline" className="w-full" onClick={() => setIsManagementLoggedIn(false)}>Logout</Button>
    </div>
  );
};

export default ManagementTab;
